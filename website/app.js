var React = require('react')
  , kent = require('kent')
  , app = module.exports = kent()
  , kentReact = require('kent-react')
  , config = require('../common/config')
  , api = require('../api/client')
  , fb = require('../common/util/facebook')

if(__SERVER__) {

	app.set('trust proxy', true)

	if(process.env.NODE_ENV == 'development') {
		var webpack = require('webpack')
		  , webpackConfig = require('./webpack.config.js')
		  , compiler = webpack(webpackConfig)

		app.connect(require('webpack-dev-middleware')(compiler, {
			noInfo: true,
			publicPath: webpackConfig.output.publicPath
		}))

		app.connect(require('webpack-hot-middleware')(compiler))
	} else {
		app.serve(__dirname+'/dist', { mount:'/dist' })
	}

	app.serve(__dirname+'/public')

	app.connect(require('../common/middleware/session'))

}

app.use(kentReact({ 
	clientContext:`{
		device:{
			width:document.documentElement.clientWidth,
			height:document.documentElement.clientHeight
		},
		timezoneOffset: new Date().getTimezoneOffset()
	}`,
	contextTypes: {
		user:React.PropTypes.object,
		device:React.PropTypes.object,
		url:React.PropTypes.string,
		timezoneOffset:React.PropTypes.number
	}
}))

app.use(function(next) {
	this.context.url = this.href
	this.context.user = __SERVER__ ? this.req.session.user : window.user
	this.props.radius = parseFloat(this.cookies.get('radius')) || 10

	if(this.cookies.get('location')) {
		this.props.location = JSON.parse(this.cookies.get('location'))
	}

	next()
})

app.use(function(next) {
	this.api = __SERVER__ ? api.createInstance(this.req.headers.cookie) : api
	next()
})

app.use(function(next) {
	this.fb = __SERVER__ ? fb.createInstance(this.req.session.token) : fb
	next()
})

app.use(require('./document'))
app.use(require('./router'))

if(__SERVER__) app.listen(config.webserver.port, function(err) {
	if(err) throw err
	var { protocol, host, port } = config.webserver
	console.log('webserver running at', protocol+'://'+host+(port==80 ? '' : ':'+port ))
})

if(__BROWSER__) app.start()

if(__BROWSER__) {
	window.app = app

	window.fbAsyncInit = function() {
		FB.init({
			appId: config.facebook.appId,
			xfbml: false,
			status: true,
			version: config.facebook.version
		})
	}

	if(window.FB) window.fbAsyncInit()
}