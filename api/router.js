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
		fb.get('/me').query({
			access_token:access_token
		}).end(function(err, response) {
			if(err) return next(err)

			var user = JSON.parse(response.text)

			req.session.fbid = user.id
			req.session.token = access_token

			res.json({ fbid:user.id, token:access_token })
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
	  , anHourAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours()-1)
	  , end = timeUtil.getEndOfTomorrow(now)

	r.table('moment').filter(
		r.row('time').gt(anHourAgo)
	).orderBy(
		r.asc('time')
	).run(connection).then(function(moments) {
		return moments.toArray()
	}).then(function(moments) {
		res.json(moments)
	}).catch(next)
})

// Get moment by id
router.get('/moments/:id', function(req, res, next) {
	r.table('moment').get(req.params.id).run(connection).then(function(moment) {
		res.json(moment)
	}).catch(next)
})

// Create moment
router.post('/moments'/*, session, bodyParser*/, function(req, res, next) {
	if(!req.session.fbid)
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

	moment.attendees = [req.session.fbid]

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
// router.post('/moments/:id/posts', session, bodyParser, function(req, res, next){})

// I'm in
router.post('/moments/:id/attendees'/*, session*/, function(req, res, next){
	if(!req.session.fbid)
		return res.status(401).end('Not Logged In')

	r.table('moment').get(req.params.id).update({ 
		attendees:r.row('attendees').setInsert(req.session.fbid) 
	}).run(connection).then(function(moment) {
		res.status(204).end()
	}).catch(next)
})

// I'm out
router.delete('/moments/:id/attendees'/*, session*/, function(req, res, next){

})

module.exports = router