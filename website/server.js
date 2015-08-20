var express = require('express')
  , app = module.exports = express()
  , webpackDevMiddleware = require("webpack-dev-middleware")
  , webpack = require("webpack")
  , compiler = webpack(require('./webpack.config.js'))
  , session = require('../common/middleware/session')
  , config = require('../common/config')
  , bodyParser = require('body-parser')
  , api = require('../api/client')
  , reactView = require('express-iso-react-views').init({ 
      root:__dirname+'\\components',
      layout: 'layout',
      mountNode:'#app'
    })

app.set('views', __dirname + '/components');
app.set('view engine', 'js');
app.engine('js', reactView.engine);

app.use(reactView.middleware)

app.use(express.static(__dirname+'/public'))

app.use(webpackDevMiddleware(compiler))

app.use(session)

app.use(bodyParser.urlencoded({}))

app.use(function(req, res, next) {
	res.locals.fbid = req.session.fbid
	next()
})

app.use(function(req, res, next) {
  req.api = api.createInstance(req.get('cookie'))
  next()
})

app.use(require('./router'))

app.listen(config.webserver.port, function(err) {
  if(err) throw err
  console.log('webserver running on port', config.webserver.port)
})
