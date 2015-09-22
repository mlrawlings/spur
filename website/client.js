var kent = require('kent/client')
  , kentReact = require('kent-react/client')
  , api = require('../api/client')
  , fb = require('../common/util/facebook')
  , locationUtil = require('./util/location')
  , router = require('./router')
  , app = window.app = kent()

app.use(kentReact())

app.use(function(next) {
  this.props.user = window.user
  this.props.location = JSON.parse(this.cookies.get('location'))
  this.props.radius = parseFloat(this.cookies.get('radius'))

  next()
})

app.use(function(next) {
  this.api = api
  next()
})

app.use(function(next) {
  this.fb = fb
  next()
})

app.use(router)

app.start()