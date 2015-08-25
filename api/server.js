var express = require('express')
  , app = module.exports = express()
  , bodyParser = require('body-parser')
  , config = require('../common/config')
  , router = require('./router')
  , session = require('../common/middleware/session')

require('../common/util/json-date-parse')

app.use(function(req, res, next) {
	res.set('Access-Control-Allow-Headers', 'Content-Type')
	res.set('Access-Control-Allow-Credentials', 'true')
	res.set('Access-Control-Allow-Origin', config.webserver.protocol + '://' + config.webserver.host + ':' + config.webserver.port)
	res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE')
	next()
})

app.use(session)
app.use(bodyParser.json())
app.use(router)

app.listen(config.api.port, function(err) {
	if(err) throw err
	console.log('api server running on port', config.api.port)
})