var express = require('express')
  , app = module.exports = express()
  , config = require('../common/config')
  , router = require('./router')
  , session = require('../common/middleware/session')
  , cookieParser = require('cookie-parser')

app.use(cookieParser())

require('../common/util/json-date-parse')

app.use(function(req, res, next) {
	res.set('Access-Control-Allow-Headers', 'Content-Type')
	res.set('Access-Control-Allow-Credentials', 'true')
	if(process.env.NODE_ENV == 'production') {
		res.set('Access-Control-Allow-Origin', config.webserver.protocol + '://' + config.webserver.host)
	} else {
		res.set('Access-Control-Allow-Origin', req.get('origin'))
	}
	res.set('Access-Control-Allow-Methods', 'HEAD, GET, POST, DELETE')
	next()
})

app.use(session)
app.use(router)
app.use(function(err, req, res, next) {
	res.status(500).send(err.message)
})

app.listen(config.api.port, function(err) {
	if(err) throw err
	console.log('api running at', config.api.protocol+'://'+config.api.host+(config.api.port==80 ? '' : ':'+config.api.port ))
})