var express = require('express')
  , app = module.exports = express()
  , nunjucks = require('nunjucks')
  , webpackDevMiddleware = require("webpack-dev-middleware")
  , webpack = require("webpack")
  , compiler = webpack(require('./webpack.config.js'))
  , session = require('../common/middleware/session')
  , config = require('../common/config')
  , bodyParser = require('body-parser')

nunjucks.configure(__dirname+'/views', {
    autoescape: true,
    express: app
})

app.use(express.static(__dirname+'/public'))

app.use(webpackDevMiddleware(compiler))

app.use(session)

app.use(bodyParser.urlencoded({}))

app.use(function(req, res, next) {
	res.locals.fbid = req.session.fbid
	next()
})

app.use(require('./middleware/api'))

app.use(require('./router'))

app.listen(config.webserver.port, function(err) {
  if(err) throw err
  console.log('webserver running on port', config.webserver.port)
})
