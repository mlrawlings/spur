var express = require('express')
  , router = express.Router()
  , jsonParser = require('body-parser').json()
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

router.post('/auth/guest', jsonParser, function(req, res, next) {
	if(req.session.user) return next(new Error('You are currently logged in.'))

	var user = {
		name: {
			first: req.body.name,
			full: req.body.name
		},
		isGuest: true,
		events:[],
		notifications:[]
	}

	return r.table('users').insert(user).run(connection).then(function(result) {
		user.id = result.generated_keys[0]
		return user
	}).then(function(user) {
		req.session.user = user
		res.json({ user:user })
	}).catch(function(err) {
		console.error(err)
		next(err)
	})
})

router.post('/auth/facebook'/*, session*/, function(req, res, next) {
	var access_token, fbUser
	fb.exchangeToken(req.query.access_token).then(function(_result) {
		access_token = _result
		return fb.get('/me?fields=name,first_name,last_name,birthday,email,gender').query({ access_token })
	}).then(function(_result) {
		fbUser = _result
		return r.table('users').filter({ fbid:fbUser.id }).limit(1).run(connection).then(users => users.toArray())
	}).then(function(users) {
		var user = users[0]
		if(!user) {
			user = {
				fbid:fbUser.id,
				name: {},
				isGuest: false
			}
			
			if(!req.session.user) {
				user.events = [],
				user.notifications = []
			}


			if(fbUser.birthday) user.birthday = new Date(fbUser.birthday)
			if(fbUser.email) user.email = fbUser.email
			if(fbUser.first_name) user.name.first = fbUser.first_name
			if(fbUser.last_name) user.name.last = fbUser.last_name
			if(fbUser.name) user.name.full = fbUser.name
			if(fbUser.gender) user.gender = fbUser.gender

			if(req.cookies.location) try {
				user.location = JSON.parse(req.cookies.location)
			} catch(e) {}


			if(req.session.user) {
				return r.table('users').get(req.session.user.id).update(user).run(connection).then(function(result) {
					user.id = req.session.user.id
					return user
				})
			} else {
				return r.table('users').insert(user).run(connection).then(function(result) {
					user.id = result.generated_keys[0]
					return user
				})
			}
		} else if(req.session.user && req.session.user.fbid != user.fbid) {
			throw new Error('Facebook user already associated with a spur account')
		}

		return user
	}).then(function(user) {
		req.session.user = user
		req.session.token = access_token
		res.json({ user:user, token:access_token })
	}).catch(function(err) {
		console.error(err)
		next(err)
	})
})

router.delete('/auth'/*, session*/, function(req, res, next) {
	req.session.destroy(function(err) {
		if(err) return next(err)

		res.end()
	})
})

router.get('/users/:id', function(req, res, next) {
	r.table('users').get(req.params.id).run(connection).then(function(user) {
		if(!user)
			return res.status(404).end('This User Does Not Exist')

		if(!req.session.user) {
			r.table('users').get(req.params.id).merge(function(user) {
				return { events:[] }
			}).without('email', 'location').run(connection).then(function(user) {
				res.json(user)
			}).catch(function(err) {
				next(err)
			})
		} else if(req.session.user.id == req.params.id) {
			r.table('users').get(req.params.id).merge(function(user) {
				return {
					events:r.table('events').filter(function(event) {
						return user('events').contains(event('id'))
					}).orderBy(r.desc('time')).coerceTo('array')
				}
			}).without('email', 'location').run(connection).then(function(user) {
				res.json(user)
			}).catch(function(err) {
				next(err)
			})
		} else {
			r.table('users').get(req.params.id).merge(function(user) {
				return {
					events:r.table('events').filter(function(event) {
						return user('events').contains(event('id')).and(r.table('users').get(req.session.user.id)('events').contains(event('id')))
					}).orderBy(r.desc('time')).coerceTo('array')
				}
			}).without('email', 'location').run(connection).then(function(user) {
				res.json(user)
			}).catch(function(err) {
				next(err)
			})
		}
	}).catch(next)

})

// Gets all events, auto filter no past events, none after tomorrow
router.get('/events', function(req, res, next) {
	var now = new Date()
	  , twentyMinutesAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes()-20)
	  , end = timeUtil.getEndOfTomorrow(now)
	  , location = (req.query.location || '').split(',').reverse().map(function(val) { return parseFloat(val) })
	  , radius = parseFloat(req.query.radius) || 1

	if(location.length != 2 || isNaN(location[0]) || isNaN(location[1])) {
		return next(new Error('you must define a location: "lat,lng"'))
	}

	var containsAttendees = req.session.user ? r.row('attendees').contains(req.session.user.id) : false
	  , isOwner = req.session.user ? r.row('owner').eq(req.session.user.id) : false

	r.table('events').getIntersecting(
		r.circle(location, radius, {unit: 'mi'}), 
		{ index:'locationIndex' }
	).filter(
		r.row('time').gt(twentyMinutesAgo)
		.and(
			r.row('cancelled').ne(true)
			.or(containsAttendees)
			.or(isOwner)
		).and(
			r.row('private').ne(true)
		)
	).orderBy(
		r.asc('time')
	).without(
		'locationIndex'
	).run(connection).then(function(events) {
		return events.toArray()
	}).then(function(events) {
		res.json(events)
	}).catch(function(err) {
		console.error(err)
		next(err)
	})
})

// Get event by id
router.get('/events/:id', function(req, res, next) {
	r.table('events').get(req.params.id).run(connection).then(function(event) {
		if(!event)
			return res.status(404).end('This Event Does Not Exist')

		r.table('events').get(req.params.id).merge(function(event) {
			return {
				attendees:r.table('users').without('email', 'location').filter(function(user) {
					return event('attendees').contains(user('id'))
				}).coerceTo('array'),
				posts:event('posts').map(function(post) {
					return post.merge(function(post) {
						return {
							user:r.table('users').get(post('user')).without('email', 'location'),
							comments:post('comments').map(function(comment) {
								return comment.merge(function(comment) {
									return {
										user:r.db('spur').table('users').get(comment('user'))
									}
								})
							})
						}
					})
				}).orderBy(r.asc('time'))
			}
		}).run(connection).then(function(event) {
			res.json(event)
		}).catch(function(err) {
			console.error(err)
			next(err)
		})
	}).catch(next)
})

function validateEvent(event) {
	var now = new Date()

	if(typeof event.time != 'object') event.time = new Date(event.time)

	if(!event) throw new Error('No event object')
	if(!event.name) throw new Error('name is required')
	if(event.name.length > 64) throw new Error('name is too long (max 64 characters)')
	if(!event.time) throw new Error('time is required')
	if(!event.location) throw new Error('location is required')
	if(!event.location.street) throw new Error('location.street is required')
	if(!event.location.citystatezip) throw new Error('location.citystatezip is required')
	if(!event.location.coords) throw new Error('location.coords is required')
	if(event.location.name && event.location.name.length > 48) throw new Error('location.name is too long (max 48 characters)')

	if(event.time > timeUtil.getEndOfTomorrow(now)) throw new Error('time cannot be after tomorrow')
	
	if(event.endTime && event.endTime < event.time) throw new Error('endTime cannot be before start time')

	if(!event.endTime) event.endTime = null

	if(event.max && event.max < 2) throw new Error('event max attendees cannot be less than 2')
	if(!event.max) {
		event.max = null
	} else {
		event.max = parseInt(event.max)
	}

	event.locationIndex = r.point(event.location.coords[1], event.location.coords[0])
	
	return event
}

// Edit event by id
router.put('/events/:id', jsonParser, function(req, res, next) {
	if(!req.session.user)
		return res.status(401).end('Not Logged In')

	var event = validateEvent(req.body)

	r.table('events').get(req.params.id).update(function(oldEvent) {
		return r.branch(oldEvent('owner').eq(req.session.user.id), event, {})
	}).run(connection).then(function() {
		addEventNotification('EDIT', req.params.id, req.session.user)
		res.status(204).end()
	}).catch(function(err) {
		next(err)
	})
})

// Create event
router.post('/events', jsonParser, function(req, res, next) {
	if(!req.session.user)
		return res.status(401).end('Not Logged In')
	
	var event = validateEvent(req.body)

	event.posts = []
	event.invitees = []
	event.cancelled = false
	event.attendees = [req.session.user.id]
	event.owner = req.session.user.id

	r.table('events').insert(event).run(connection).then(function(event) {
		return r.table('users').get(req.session.user.id).update({ 
			events:r.row('events').setInsert(event.generated_keys[0]) 
		}).run(connection).then(function() {
			res.status(201).json(event.generated_keys[0])
		})
	}).catch(function(err) {
		console.error(err)
		next(err)
	})

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

// Invite person to an event
router.get('/events/:id/invite/:cid', function(req, res, next) {
	var newInvitee = { time: new Date() }
	if(req.session.user) {
		newInvitee.type = 'id'
		newInvitee.id = req.session.user.id
	} else {
		newInvitee.type = 'cookie'
		newInvitee.id = req.params.cid
	}

	r.table('events').get(req.params.id).update(function(event) {
		return r.branch(
			event('invitees').contains(function(invitee) {
				return invitee('id').eq(newInvitee.id).and(invitee('type').eq(newInvitee.type))
			}),
			{ invitees: event('invitees').default([newInvitee]) },
			{ invitees: event('invitees').append(newInvitee) }
		)
	}).run(connection).then(function(event) {
		res.status(204).end()
	}).catch(function(err) {
		next(err)
	})
})

// Cancel an event
router.post('/events/:id/cancel', function(req, res, next) {
	if(!req.session.user)
		return res.status(401).end('Not Logged In')

	r.table('events').get(req.params.id).update(function(event) {
		return r.branch(event('owner').eq(req.session.user.id), {
			cancelled: true
		}, {})
	}).run(connection).then(function(event) {
		addEventNotification('CANCEL', req.params.id, req.session.user)
		res.status(204).end()
	}).catch(function(err) {
		next(err)
	})
})

// UnCancel an event
router.post('/events/:id/uncancel', function(req, res, next) {
	if(!req.session.user)
		return res.status(401).end('Not Logged In')

	r.table('events').get(req.params.id).update(function(event) {
		return r.branch(event('owner').eq(req.session.user.id), {
			cancelled: false
		}, {})
	}).run(connection).then(function(event) {
		addEventNotification('UNCANCEL', req.params.id, req.session.user)
		res.status(204).end()
	}).catch(function(err) {
		next(err)
	})
})

// Create a post on a event
router.post('/events/:id/posts', jsonParser, function(req, res, next) {
	if(!req.session.user)
		return res.status(401).end('Not Logged In')

	var post = {
		user:req.session.user.id,
		message:req.body.message,
		time:new Date(),
		comments:[],
		id:r.row('posts').count()
	}

	r.table('events').get(req.params.id).update({ 
		posts:r.row('posts').append(post)
	}).run(connection).then(function(event) {
		addEventNotification('MESSAGE', req.params.id, req.session.user, req.body.message)
		res.status(204).end()
	}).catch(function(err) {
		console.error(err)
		next(err)
	})
})

// Create a comment on a post
router.post('/events/:mid/posts/:pid/comments', jsonParser, function(req, res, next) {
	if(!req.session.user)
		return res.status(401).end('Not Logged In')

	var postIndex = parseInt(req.params.pid)
	
	var comment = {
		user:req.session.user.id,
		message:req.body.message,
		time:new Date()
	}

	r.table('events').get(req.params.mid).update({
		posts:r.row('posts').changeAt(postIndex, r.row('posts').nth(postIndex).merge(function(post) {
			return { comments:post('comments').append(comment) }
		}))
	}).run(connection).then(function(event) {
		res.status(204).end()
	}).catch(function(err) {
		console.error(err)
		next(err)
	})
})

// I'm in
router.post('/events/:id/attendees'/*, session*/, function(req, res, next){
	if(!req.session.user)
		return res.status(401).end('Not Logged In')

	Promise.all([
		r.table('events').get(req.params.id).update({ 
			attendees:r.row('attendees').setInsert(req.session.user.id) 
		}).run(connection),
		r.table('users').get(req.session.user.id).update({ 
			events:r.row('events').setInsert(req.params.id) 
		}).run(connection)
	]).then(function() {
		addEventNotification('JOIN', req.params.id, req.session.user)
		res.status(204).end()
	}).catch(function(err) {
		console.error(err)
		next(err)
	})
})

// I'm out
router.delete('/events/:id/attendees'/*, session*/, function(req, res, next){
	if(!req.session.user)
		return res.status(401).end('Not Logged In')

	Promise.all([
		r.table('events').get(req.params.id).update({ 
			attendees:r.row('attendees').setDifference([req.session.user.id]) 
		}).run(connection),
		r.table('users').get(req.session.user.id).update({ 
			events:r.row('events').setDifference([req.params.id]) 
		}).run(connection)
	]).then(function(event) {
		addEventNotification('BAIL', req.params.id, req.session.user)
		res.status(204).end()
	}).catch(function(err) {
		console.error(err)
		next(err)
	})
})

function addEventNotification(action, eventId, user, message) {
	return r.table('events').get(eventId).run(connection).then(function(event) {
		var users = getUsersToNotify(event, user)
		  , notification = {
				title: event.name,
				url: '/event/'+event.id,
				time: new Date(),
				user: user
			}

		if(action == 'EDIT') {
			notification.body = user.name.first + ' changed the info'
		} else if(action == 'JOIN') {
			notification.body = user.name.first + ' is going'
		} else if(action == 'BAIL') {
			notification.body = user.name.first + ' bailed'
		} else if(action == 'CANCEL') {
			notification.body = user.name.first + ' cancelled the event'
		} else if(action == 'UNCANCEL') {
			notification.body = user.name.first + ' uncancelled the event'
		} else if(action == 'MESSAGE') {
			notification.body = user.name.first + ' said, "'+message+'"'
		}

		return addNotification(users, notification)
	})
}

function getUsersToNotify(event, user) {
	var users = [].concat(event.attendees)

	event.posts.forEach(function(post) {
		if(users.indexOf(post.user) == -1)
			users.push(post.user)
	})

	var userIndex = users.indexOf(user.id)
	if(userIndex > -1)
		users.splice(userIndex, 1)

	return users
}

function addNotification(users, notification) {
	if(!users.length) return Promise.resolve()

	return r.table('users').getAll(r.args(users)).update({
		notifications:r.row('notifications').prepend(notification)
	}).run(connection)
}

module.exports = router