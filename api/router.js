var express = require('express')
  , router = express.Router()
  , timeUtil = require('./util/time')
  , request = require('superagent')
  , qs = require('qs')
  , r = require('rethinkdb')
  , config = require('../common/config')
  , fb = require('../common/util/facebook')
  , connection

r.connect(config.rethink).then(function(conn) {
	connection = conn
})

router.post('/auth'/*, session*/, function(req, res, next) {
	fb.exchangeToken(req.query.access_token, function(err, access_token) {
		fb.get('/me?fields=name,first_name,last_name,birthday').query({
			access_token:access_token
		}).end(function(err, response) {
			if(err) return next(err)

			var fbUser = JSON.parse(response.text)

			r.table('users').filter({ fbid:fbUser.id }).limit(1).run(connection).then(function(users) {
				return users.toArray()
			}).then(function(users) {
				var user = users[0]
				if(!user) {
					user = {
						fbid:fbUser.id,
						name: {
							first:fbUser.first_name,
							last:fbUser.last_name,
							full:fbUser.name
						},
						birthday: new Date(fbUser.birthday)
					}
					return r.table('users').insert(user).run(connection).then(function(result) {
						user.id = result.generated_keys[0]
						return user
					})
				}
				return user
			}).then(function(user) {
				req.session.user = user
				req.session.token = access_token

				res.json({ user:user, token:access_token })
			})
		})
	})
})

router.delete('/auth'/*, session*/, function(req, res, next) {
	req.session.destroy(function(err) {
		if(err) return next(err)

		res.end()
	})
})

// Gets all moments, auto filter no past moments, none after tomorrow
router.get('/moments', function(req, res, next) {
	var now = new Date()
	  , twentyMinutesAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes()-20)
	  , end = timeUtil.getEndOfTomorrow(now)
	  , location = (req.query.location || '').split(',').reverse().map(function(val) { return parseFloat(val) })
	  , radius = parseFloat(req.query.radius) || 1

	if(location.length != 2 || isNaN(location[0]) || isNaN(location[1])) {
		return next(new Error('you must define a location: "lat,lng"'))
	}

	r.table('moment').getIntersecting(
		r.circle(location, radius, {unit: 'mi'}), 
		{ index:'locationIndex' }
	).filter(
		r.row('time').gt(twentyMinutesAgo)
	).orderBy(
		r.asc('time')
	).without(
		'locationIndex'
	).run(connection).then(function(moments) {
		return moments.toArray()
	}).then(function(moments) {
		res.json(moments)
	}).catch(next)
})

// Get moment by id
router.get('/moments/:id', function(req, res, next) {
	r.table('moment').get(req.params.id).merge(function(moment) {
		return {
			attendees:r.table('users').filter(function(user) {
				return moment('attendees').contains(user('id'))
			}).coerceTo('array'),
			posts:moment('posts').map(function(post) {
				return post.merge(function(post) {
					return {
						user:r.db('spur').table('users').get(post('user'))
					}
				})
			})
		}
	}).run(connection).then(function(moment) {
		res.json(moment)
	}).catch(next)
})

// Create moment
router.post('/moments'/*, session, bodyParser*/, function(req, res, next) {
	if(!req.session.user)
		return res.status(401).end('Not Logged In')
	
	var now = new Date()
	  , moment = req.body

	if(!moment.name) throw new Error('name is required')
	if(!moment.time) throw new Error('time is required')
	if(!moment.location) throw new Error('location is required')
	if(!moment.location.name) throw new Error('location.name is required')
	if(!moment.location.street) throw new Error('location.street is required')
	if(!moment.location.citystatezip) throw new Error('location.citystatezip is required')
	if(!moment.location.coords) throw new Error('location.coords is required')

	if(moment.time <= now) throw new Error('time cannot be in the past')
	if(moment.time > timeUtil.getEndOfTomorrow(now)) throw new Error('time cannot be after tomorrow')

	moment.posts = []
	moment.attendees = [req.session.user.id]
	moment.locationIndex = r.point(moment.location.coords[1], moment.location.coords[0])

	r.table('moment').insert(moment).run(connection).then(function(moment) {
		res.status(201).json(moment.generated_keys[0])
	}).catch(next)

	// {
	// 	name: String required,
	// 	category: String,
	// 	time: DateTime required,
	// 	location: {
	// 		name: String required,
	// 		street: String required,
	// 		citystatezip: String required,
	// 		coords: [Number] required
	// 	},
	// 	// owner: UserId
	// 	// details: String,
	// 	// attendees: [UserId],
	// 	// posts: [PostId]
	// }
})

// Create a post on a moment
router.post('/moments/:id/posts', function(req, res, next) {
	if(!req.session.user)
		return res.status(401).end('Not Logged In')

	r.table('moment').get(req.params.id).update({ 
		posts:r.row('posts').prepend({
			user:req.session.user.id,
			message:req.body.message,
			time:new Date()
		}) 
	}).run(connection).then(function(moment) {
		res.status(204).end()
	}).catch(next)
})

// I'm in
router.post('/moments/:id/attendees'/*, session*/, function(req, res, next){
	if(!req.session.user)
		return res.status(401).end('Not Logged In')

	r.table('moment').run(connection).then(function(moment) {
		res.status(204).end()
	}).catch(next)
})

// I'm out
router.delete('/moments/:id/attendees'/*, session*/, function(req, res, next){

})

module.exports = router