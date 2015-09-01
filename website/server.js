require('babel/register')({
  ignore:false
})

var express = require('express')
  , app = module.exports = express()
  , webpackDevMiddleware = require("webpack-dev-middleware")
  , expressReact = require('express-react')
  , webpack = require("webpack")
  , compiler = webpack(require('./webpack.config.js'))
  , session = require('../common/middleware/session')
  , config = require('../common/config')
  , bodyParser = require('body-parser')
  , locationUtil = require('./util/location')
  , api = require('../api/client')
  , fb = require('../common/util/facebook')

app.use(expressReact())

app.use(express.static(__dirname+'/public'))
app.use('/dist', express.static(__dirname+'/dist'))

app.use(session)

app.use(bodyParser.urlencoded({}))

app.use(function(req, res, next) {
	res.props.fbid = req.session.fbid
  locationUtil.getLocationFromIp(req.ip).then(function(location) {
    if(!location.coords[0]) {
      res.props.location = {
        name:'Roanoke, VA',
        coords:[37.253354,-79.9572075]
      }
    } else {
      res.props.location = location
    }
    next()
  }).catch(next)
})

app.use(function(req, res, next) {
  req.api = api.createInstance(req.get('cookie'))
  next()
})

app.use(function(req, res, next) {
  req.fb = fb.createInstance(req.session.token)
  next()
})

app.use(require('./router'))

app.listen(config.webserver.port, function(err) {
  if(err) throw err
  console.log('webserver running on port', config.webserver.port)
})
