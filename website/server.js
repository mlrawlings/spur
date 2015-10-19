var kent = require('kent/server')
  , app = module.exports = kent()
  , kentReact = require('kent-react')
  , session = require('../common/middleware/session')
  , config = require('../common/config')
  , locationUtil = require('./util/location')
  , api = require('../api/client')
  , fb = require('../common/util/facebook')

app.set('trust proxy', true)

if(process.env.NODE_ENV == 'development') {
	var webpack = require('webpack')
	  , webpackConfig = require('./webpack.config.js')
	  , compiler = webpack(webpackConfig)

	app.connect(require('webpack-dev-middleware')(compiler, {
		noInfo: true,
		publicPath: webpackConfig.output.publicPath
	}))

	// app.connect(require('webpack-hot-middleware')(compiler))
} else {
	app.serve(__dirname+'/dist', { mount:'/dist'})
}

app.serve(__dirname+'/public')

app.connect(session)

app.use(kentReact())

app.use(function(next) {
	this.props.user = this.req.session.user
	this.props.radius = parseFloat(this.cookies.get('radius')) || 10

	if(this.cookies.get('location')) {
		this.props.location = JSON.parse(this.cookies.get('location'))
	}

	next()
})

app.use(function(next) {
	this.api = api.createInstance(this.req.headers.cookie)
	next()
})

app.use(function(next) {
	this.fb = fb.createInstance(this.req.session.token)
	next()
})

app.use(require('./router'))

app.listen(config.webserver.port, function(err) {
	if(err) throw err
	var { protocol, host, port } = config.webserver
	console.log('webserver running at', protocol+'://'+host+(port==80 ? '' : ':'+port ))
})
