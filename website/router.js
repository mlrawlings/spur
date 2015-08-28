var Router = require('express/lib/router')
  , Home = require('./components/home')
  , EventResults = require('./components/event-results')
  , EventPage = require('./components/event-page')
  , EventForm = require('./components/event-form')
  , router = new Router()

router.all('*', function(req, res, next) {
	res.document.title = 'Spur | Live in the Moment'

	res.document.scripts = [
		'https://cdnjs.cloudflare.com/ajax/libs/react/'+require('react').version+'/react.min.js',
		{ src:'//connect.facebook.net/en_US/sdk.js', async:true },
        'http://maps.google.com/maps/api/js?sensor=false',
		'/dist/client.js'
	]

	res.document.styles = [
		'http://fonts.googleapis.com/css?family=Open+Sans:400,300,700,600',
		'https://cdnjs.cloudflare.com/ajax/libs/normalize/3.0.3/normalize.min.css',
		'/styles/core.css'
	]

	res.document.meta = [
		{ name:'viewport', content:'width=device-width, initial-scale=1' }
	]

	next()
})

router.get('/', function (req, res, next) {
	req.api.get('/moments').end(function(err, response) {
		if(err) return next(err)

		res.render(Home, { events: response.body })
	})
})

router.get('/events', function(req, res, next) {
	req.api.get('/moments').end(function(err, response) {
		if(err) return next(err)

		res.render(EventResults, { events: response.body, search:req.query.q })
	})
})

router.get('/event/:id', function(req, res, next) {
	req.api.get('/moments/'+req.params.id).end(function(err, response) {
		if(err) return next(err)

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

router.get('/create/event', function(req, res) {
	res.render(EventForm, {})
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