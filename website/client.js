var express = require('express-client')
  , expressReact = require('express-react/client')
  , api = require('../api/client')
  , fb = require('../common/util/facebook')
  , locationUtil = require('./util/location')
  , router = require('./router')
  , app = express()

require('../common/util/json-date-parse')

app.use(expressReact())

app.use(function(req, res, next) {
	res.props.fbid = FB.getUserID()
  locationUtil.getLocation().then((location) => {
    res.props.location = location
    next()
  }).catch(next)
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
