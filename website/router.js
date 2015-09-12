var Router = require('express/lib/router')
  , Home = require('./components/home')
  , EventResults = require('./components/event/event-results')
  , EventPage = require('./components/event/event-page')
  , NewEventForm = require('./components/event/new-event-form')
  , router = new Router()

router.all('*', function(req, res, next) {
	res.document.title = 'Spur | Live in the Moment'

	res.document.scripts = [
		'https://cdnjs.cloudflare.com/ajax/libs/react/'+require('react').version+'/react-with-addons.min.js',
		{ src:'//connect.facebook.net/en_US/sdk.js', async:true },
        'https://maps.google.com/maps/api/js?sensor=false&libraries=places',
		'/dist/client.js'
	]

	res.document.styles = [
		'https://fonts.googleapis.com/css?family=Open+Sans:400,300,700,600',
		'https://cdnjs.cloudflare.com/ajax/libs/normalize/3.0.3/normalize.min.css',
		'/styles/core.css'
	]

	res.document.meta = [
		{ name:'viewport', content:'width=device-width, initial-scale=1' }
	]

	next()
})

router.get('/', function (req, res, next) {
	var location = res.props.location.coords.join(',')
	req.api.get('/moments').query({ location, radius:req.query.radius }).end(function(err, response) {
		if(err) return next(err)

		res.render(Home, { events: response.body })
	})
})

router.get('/events', function(req, res, next) {
	var location = res.props.location.coords.join(',')
	  , radius = req.query.radius || 5

	req.api.get('/moments').query({ location, radius }).end(function(err, response) {
		if(err) return next(err)

		res.render(EventResults, { events: response.body, radius, search:req.query.q })
	})
})

router.get('/event/:id', function(req, res, next) {
	req.api.get('/moments/'+req.params.id).end(function(err, response) {
		if(err) return next(err)
		if(!response.body) return res.status(404).end()

		var event = response.body

		res.document.title = event.name + ' | Spur'

		res.render(EventPage, { event:event })
	})
})

router.get('/event/:id/join', function(req, res, next) {
	req.api.post('/moments/'+req.params.id+'/attendees').end(function(err, response) {
		if(err) return next(err)

		res.redirect('/event/'+req.params.id)
	})
})

router.get('/event/:id/bail', function(req, res, next) {
	req.api.del('/moments/'+req.params.id+'/attendees').end(function(err, response) {
		if(err) return next(err)

		res.redirect('/event/'+req.params.id)
	})
})

router.post('/event/:id/post', function(req, res, next) {
	req.api.post('/moments/'+req.params.id+'/posts').send(req.body).end(function(err, response) {
		if(err) return next(err)

		res.redirect('/event/'+req.params.id)
	})
})

router.post('/event/:id/posts/:pid/comment', function(req, res, next) {
	req.api.post('/moments/'+req.params.id+'/posts/'+req.params.pid+'/comments').send(req.body).end(function(err, response) {
		if(err) return next(err)

		res.redirect('/event/'+req.params.id)
	})
})

router.get('/create/event', function(req, res) {
	res.render(NewEventForm, {})
})

router.post('/create/event', function(req, res) {
	var event = req.body

	if(event.location && event.location.coords) {
		if(event.location.coords[0]) event.location.coords[0] = parseFloat(event.location.coords[0])
		if(event.location.coords[1]) event.location.coords[1] = parseFloat(event.location.coords[1])
	}

	req.api.post('/moments').send(event).end(function(err, response) {
		if(err) return console.log(err)

		res.redirect('/event/'+response.body)
	})
})

module.exports = router