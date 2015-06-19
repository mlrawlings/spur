var Router = require('express').Router
  , router = new Router()

router.get('/', function (req, res) {
	res.render('home.html', { title: 'My Site' })
})

router.get('/events', function(req, res) {
	res.render('event-results.html', {})
})

router.get('/event/:id', function(req, res) {
	res.render('event-page.html', {})
})

module.exports = router