var express = require('express')
  , app = express()
  , bodyParser = require('body-parser')
  , port = process.env.PORT || 8080
  , router = express.Router()
  , r = require('rethinkdb')
  , config = require('./config')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

var rethink = r.connect(config.db)
rethink.then(function(conn) {
	app.db = conn
})

app.use(function(req, res, next) {
	req.db = app.db
	next()
})

app.use('/api', require('./router'))

app.listen(port)
console.log('Magic happens on port ' + port)