var Router = require('express').Router
  , router = new Router()
  , moment = require('moment')

router.get('/', function (req, res) {
	res.render('home.html', { title: 'My Site' })
})

router.get('/events', function(req, res, next) {
	req.api.get('/moments').end(function(err, response) {
		if(err) return next(err)

		response.body.forEach(function(event, i) {
			event.relativeTime = moment(event.datetime).fromNow()
			event.datetime = moment(event.datetime).format('h:mm a M/D')
		})
		res.render('event-results.html', { events: response.body })
	})
})

router.get('/event/:id', function(req, res, next) {
	req.api.get('/moments/'+req.params.id).end(function(err, response) {
		if(err) return next(err)

		var event = response.body
		event.relativeTime = moment(event.datetime).fromNow()
		event.datetime = moment(event.datetime).format('h:mm a M/D')

		res.render('event-page.html', { event: event })
	})
})

router.get('/create/event', function(req, res) {
	res.render('create-event.html', {})
})

router.post('/create/event', function(req, res) {
	var now = new Date()
	req.body.datetime = req.body.datetime.split(':')
	req.body.datetime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), req.body.datetime[0], req.body.datetime[1])

	req.api.post('/moments').send(req.body).end(function(err, response) {
		if(err) return

		res.redirect('/event/'+response.body)
	})
})

module.exports = router