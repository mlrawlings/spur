var express = require('express-client')
  , expressReact = require('express-react/client')
  , api = require('../api/client')
  , fb = require('../common/util/facebook')
  , router = require('./router')
  , app = express()

require('../common/util/json-date-parse')

app.use(expressReact())

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
