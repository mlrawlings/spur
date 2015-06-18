var Router = require('express').Router
  , router = new Router()

router.get('/', function (req, res) {
	res.render('home.html', { title: 'My Site' })
})

module.exports = router