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
	res.set('Access-Control-Allow-Origin', config.webserver.protocol + '://' + config.webserver.host + ':' + config.webserver.port)
	res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE')
	res.set('Content-Type', 'application/json; charset=utf-8')
	next()
})

app.use(session)
app.use(router)

app.listen(config.api.port, function(err) {
	if(err) throw err
	var { protocol, host, port } = config.api
	console.log('api running at', protocol+'://'+host+(port==80 ? '' : ':'+port ))
})