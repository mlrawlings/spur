var Router = require('express').Router
  , router = new Router()
  , moment = require('moment')

router.get('/', function (req, res, next) {
	req.api.get('/moments').end(function(err, response) {
		if(err) return next(err)

		res.render('home', { title: 'Live in the Moment', events: response.body })
	})
})

router.get('/events', function(req, res, next) {
	req.api.get('/moments').end(function(err, response) {
		if(err) return next(err)

		res.render('event-results', { events: response.body, search:req.query.q })
	})
})

router.get('/event/:id', function(req, res, next) {
	req.api.get('/moments/'+req.params.id).end(function(err, response) {
		if(err) return next(err)

		var event = response.body

		Promise.all(event.attendees.map(function(attendee, i) {
			return new Promise(function(resolve, reject) {
				req.fb.get('/'+attendee+'?fields=id,name,picture,link,age_range').end(function(err, response) {
					if(err) return reject(err)
					resolve(event.attendees[i] = JSON.parse(response.text))
				})
			})
		})).then(function() {
			res.render('event-page', { event:event })
		})
	})
})

router.get('/event/:id/join', function(req, res, next) {
	req.api.post('/moments/'+req.params.id+'/attendees').end(function(err, response) {
		if(err) return next(err)

		res.redirect('/event/'+req.params.id)
	})
})

router.get('/create/event', function(req, res) {
	res.render('event-form', {})
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