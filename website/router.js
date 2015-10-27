var React = require('react')
  , Profile = require('./components/profile')
  , Home = require('./components/home')
  , EventResults = require('./components/event/event-results')
  , EventPage = require('./components/event/event-page')
  , NewEventForm = require('./components/event/new-event-form')
  , Four0Four = require('./components/404')
  , fb = require('../common/util/facebook')
  , kent = require('kent/router')
  , router = kent()
  , config = require('../common/config')
  , locationUtil = require('./util/location')
  , timeUtil = require('./util/time')

router.on('/profile/me', function(next) {
	if(!this.context.user) return this.render(Four0Four, {})

	this.redirect('/profile/'+this.context.user.id)
})

router.on('/profile/:id', function(next) {
	this.api.get('/users/'+this.params.id).then(profileUser => {
		this.render(Profile, { profileUser })
	}).catch((e) => {
		if(e.status == 404)
			this.render(Four0Four, {})

		next(e)
	})
})

router.on('/', function(next) {
	this.render(Home)
})

router.on('/events', function(next) {
	var radius = parseFloat(this.query.radius) || this.props.radius
	  , location = this.props.location && this.props.location.coords.join(',')

	if(radius != this.props.radius) {
		this.cookies.set('radius', radius)
		this.props.radius = radius
	}

	if(this.query.location) try {
		var newLocation = JSON.parse(this.query.location)
		location = newLocation.coords.join(',')
		this.props.location = newLocation
		this.cookies.set('location', this.query.location)
	} catch(e) {}

	if(location) {
		this.api.get('/events').query({ location, radius }).then(events => {
			this.render(EventResults, { events, radius, search:this.query.q })
		}).catch(function(err) {
			next(err)
		})
	} else {
		this.render(EventResults, { events:[], radius, search:this.query.q })
	}
		
})

router.on('/event/:id', function(next) {
	this.api.get('/events/'+this.params.id).then(event => {
		//if(!event) return this.render(NotFound, {}, 404)

		this.document.title = event.name + ' | Spur'

		this.document.meta.push({ property:'og:image', content:locationUtil.getMapImageUrl(event.location) })
		this.document.meta.push({ property:'og:image:width', content:1200 })
		this.document.meta.push({ property:'og:image:height', content:630 })
		this.document.meta.push({ property:'og:title', content:event.name })
		this.document.meta.push({ property:'og:url', content:this.href })
		
		if(event.details)
			this.document.meta.push({ property:'og:description', content:event.details })

		this.render(EventPage, { event:event })
	}).catch((e) => {
		if(e.status == 404)
			return this.render(Four0Four, {})

		next(e)
	})
})

router.on('/event/:id/edit', function(next) {
	var event = this.body

	if(!event || !event.name) {
		return this.api.get('/events/'+this.params.id).then(event => {
			var eventIsOver = (event.endTime ? event.endTime : timeUtil.sixHoursFrom(event.time)) < new Date()
			if(eventIsOver) return this.redirect('/event/'+this.params.id)
			
			this.document.title = event.name + ' | Spur'
			
			this.render(NewEventForm, { event:event })
		}).catch((e) => {
			if(e.status == 404)
				return this.render(Four0Four, {})

			next(e)
		})
	} else {
		if(event.location && event.location.coords) {
			if(event.location.coords[0]) event.location.coords[0] = parseFloat(event.location.coords[0])
			if(event.location.coords[1]) event.location.coords[1] = parseFloat(event.location.coords[1])
		}

		event.private = JSON.parse(event.private)
	
		this.api.put('/events/'+this.params.id).send(event).then(() => {
			this.redirect('/event/'+this.params.id)
		}).catch(next)
	}
})

router.on('/event/:id/invite', function(next) {
	if(__SERVER__) {
		if(/facebookexternalhit|facebot/.test(this.req.headers['user-agent'])) return this.redirect('/event/'+this.params.id)

		var now = new Date()
		  , oneYr = new Date()
		  , invitee = this.cookies.get('invitee') || Math.random()*99999999999999

		oneYr.setYear(now.getYear() + 1)

		if(!this.req.session.user)
			this.cookies.set('invitee', invitee, { expires: oneYr })
		else
			invitee = this.req.session.user.id
	}

	this.api.get('/events/'+this.params.id+'/invite/'+invitee).then(() => {
		
		this.redirect('/event/'+this.params.id)
	})
})

router.on('/event/:id/join', function(next) {
	this.api.post('/events/'+this.params.id+'/attendees').then(() => {
		this.redirect('/event/'+this.params.id)
	}).catch(next)
})

router.on('/event/:id/bail', function(next) {
	this.api.del('/events/'+this.params.id+'/attendees').then(() => {
		this.redirect('/event/'+this.params.id)
	}).catch(next)
})

router.on('/event/:id/cancel', function(next) {
	this.api.post('/events/'+this.params.id+'/cancel').send(this.body).then(() => {
		this.redirect('/event/'+this.params.id)
	}).catch(next)
})

router.on('/event/:id/uncancel', function(next) {
	this.api.post('/events/'+this.params.id+'/uncancel').send(this.body).then(() => {
		this.redirect('/event/'+this.params.id)
	}).catch(next)
})

router.on('/event/:id/post', function(next) {
	this.api.post('/events/'+this.params.id+'/posts').send(this.body).then(() => {
		this.redirect('/event/'+this.params.id)
	}).catch(next)
})

router.on('/event/:id/posts/:pid/comment', function(next) {
	this.api.post('/events/'+this.params.id+'/posts/'+this.params.pid+'/comments').send(this.body).then(() => {
		this.redirect('/event/'+this.params.id)
	}).catch(next)
})

router.on('/create/event', function(next) {
	var event = this.body

	if(!event || !event.name) return this.render(NewEventForm, {})

	if(event.location && event.location.coords) {
		if(event.location.coords[0]) event.location.coords[0] = parseFloat(event.location.coords[0])
		if(event.location.coords[1]) event.location.coords[1] = parseFloat(event.location.coords[1])
	}
	
	event.private = JSON.parse(event.private)

	this.api.post('/events').send(event).then(eventId => {
		this.redirect('/event/'+eventId)
	}).catch(next)
})

module.exports = router