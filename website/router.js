var Home = require('./components/home')
  , Profile = require('./components/profile')
  , EventResults = require('./components/event/event-results')
  , EventPage = require('./components/event/event-page')
  , NewEventForm = require('./components/event/new-event-form')
  , kent = require('kent/router')
  , router = kent()

router.use(function(next) {
	this.document.title = 'Spur | Live in the Moment'

	this.document.links = [
		{ rel:'shortcut icon', href:'/favicon.ico' }
	]

	this.document.scripts = [
		'https://cdnjs.cloudflare.com/ajax/libs/es6-promise/3.0.2/es6-promise.min.js',
		'https://cdnjs.cloudflare.com/ajax/libs/react/'+require('react').version+'/react-with-addons.min.js',
		{ src:'//connect.facebook.net/en_US/sdk.js', async:true },
        'https://maps.google.com/maps/api/js?sensor=false&libraries=places',
		'/dist/client.js'
	]

	this.document.styles = [
		'https://fonts.googleapis.com/css?family=Open+Sans:400,300,700,600',
		'https://cdnjs.cloudflare.com/ajax/libs/normalize/3.0.3/normalize.min.css',
		'/styles/core.css'
	]

	this.document.meta = [
		{ name:'viewport', content:'width=device-width, initial-scale=1' },
		{ property:'og:site_name', content:'Spur' },
		{ property:'fb:app_id', content:'1455687261396384' },
		{ property:'og:locale', content:'en_US' },
		{ property:'og:type', content:'article' }
	]

	next()
})

router.on('/profile/:id', function(next) {
	this.api.get('/users/'+this.params.id).then(profileUser => {
		this.render(Profile, { profileUser })
	}).catch(next)
})

router.on('/', function(next) {
	var radius = parseFloat(this.query.radius) || this.props.radius
	  , location = this.props.location.coords.join(',')

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

	this.api.get('/moments').query({ location, radius }).then(events => {
		this.render(EventResults, { events, radius, search:this.query.q })
	}).catch(next)
})

router.on('/event/:id', function(next) {
	this.api.get('/moments/'+this.params.id).then(event => {
		//if(!event) return this.render(NotFound, {}, 404)

		this.document.title = event.name + ' | Spur'


		this.document.meta.push({ property:'og:title', content:event.name })
		this.document.meta.push({ property:'og:url', content:this.href })
		
		if(event.description)
			this.document.meta.push({ property:'og:description', content:event.description })

		this.render(EventPage, { event:event })
	}).catch(next)
})

router.on('/event/:id/join', function(next) {
	this.api.post('/moments/'+this.params.id+'/attendees').then(() => {
		this.redirect('/event/'+this.params.id)
	}).catch(next)
})

router.on('/event/:id/bail', function(next) {
	this.api.del('/moments/'+this.params.id+'/attendees').then(() => {
		this.redirect('/event/'+this.params.id)
	}).catch(next)
})

router.on('/event/:id/cancel', function(next) {
	this.api.post('/moments/'+this.params.id+'/cancel').send(this.body).then(() => {
		this.redirect('/event/'+this.params.id)
	}).catch(next)
})

router.on('/event/:id/uncancel', function(next) {
	this.api.post('/moments/'+this.params.id+'/uncancel').send(this.body).then(() => {
		this.redirect('/event/'+this.params.id)
	}).catch(next)
})

router.on('/event/:id/post', function(next) {
	this.api.post('/moments/'+this.params.id+'/posts').send(this.body).then(() => {
		this.redirect('/event/'+this.params.id)
	}).catch(next)
})

router.on('/event/:id/posts/:pid/comment', function(next) {
	this.api.post('/moments/'+this.params.id+'/posts/'+this.params.pid+'/comments').send(this.body).then(() => {
		this.redirect('/event/'+this.params.id)
	}).catch(next)
})

router.on('/create/event', function(next) {
	var event = this.body

	if(!event) return this.render(NewEventForm, {})

	if(event.location && event.location.coords) {
		if(event.location.coords[0]) event.location.coords[0] = parseFloat(event.location.coords[0])
		if(event.location.coords[1]) event.location.coords[1] = parseFloat(event.location.coords[1])
	}

	this.api.post('/moments').send(event).then(eventId => {
		this.redirect('/event/'+eventId)
	}).catch(next)
})

module.exports = router