var Router = require('express').Router
  , router = new Router()
  , moment = require('moment')
  , Categories = require('./client/categories')

router.get('/', function (req, res) {
	res.render('home.html', { title: 'My Site' })
})

router.get('/events', function(req, res, next) {
	req.api.get('/moments').end(function(err, response) {
		if(err) return next(err)

		response.body.forEach(function(event, i) {
			event = convertEvent(event)
		})
		res.render('event-results.html', { events: response.body })
	})
})

router.get('/event/:id', function(req, res, next) {
	req.api.get('/moments/'+req.params.id).end(function(err, response) {
		if(err) return next(err)

		var event = response.body
		event = convertEvent(event)

		res.render('event-page.html', { event: event })
	})
})

router.get('/create/event', function(req, res) {
	res.render('create-event.html', {})
})

router.post('/create/event', function(req, res) {
	var now = new Date()
	  , addDays = 0

	req.body.datetime = req.body.datetime.split(':')

	// If stored hours and minutes are before current, add a day
	if(req.body.datetime[0] < now.getHours() || (req.body.datetime[0] == now.getHours() && req.body.datetime[1] < now.getMinutes()))
		addDays = 1

	req.body.datetime = new Date(now.getFullYear(), now.getMonth(), now.getDate() + addDays, req.body.datetime[0], req.body.datetime[1])

	req.api.post('/moments').send(req.body).end(function(err, response) {
		if(err) return console.log(err)

		res.redirect('/event/'+response.body)
	})
})


function convertEvent(event) {
	event.relativeTime = moment(event.datetime).fromNow()
	event.casualTime = moment(event.datetime).calendar()
	event.datetime = moment(event.datetime).format('h:mm a M/D')

	event.categoryDisplay = event.category ? Categories[event.category] : 'Other'
	event.category = event.category ? event.category : 'other'

	return event
}

module.exports = router