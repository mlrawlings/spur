var express = require('express-client')
  , expressReact = require('express-react/client')
  , cookie = require('tiny-cookie')
  , api = require('../api/client')
  , fb = require('../common/util/facebook')
  , locationUtil = require('./util/location')
  , router = require('./router')
  , app = express()

require('../common/util/json-date-parse')

app.use(expressReact())

app.use(function(req, res, next) {
	res.props.user = window.user
  res.props.location = JSON.parse(cookie.get('location'))
  next()
})

app.use(function(req, res, next) {
  req.api = api
  next()
})

app.use(function(req, res, next) {
  req.fb = fb
  next()
})

app.use(router)

app.start()
