var kent = require('kent/server')
  , app = module.exports = kent()
  , kentReact = require('kent-react')
  , session = require('../common/middleware/session')
  , config = require('../common/config')
  , locationUtil = require('./util/location')
  , api = require('../api/client')
  , fb = require('../common/util/facebook')

app.set('trust proxy', true)

app.serve(__dirname+'/public')
app.serve(__dirname+'/dist', { mount:'/dist'})

app.connect(session)

app.use(kentReact())

app.use(function(next) {
	this.props.user = this.req.session.user
	this.props.radius = parseFloat(this.cookies.get('radius')) || 10

	if(this.cookies.get('location')) {
		this.props.location = JSON.parse(this.cookies.get('location'))
		return next()
	}

	locationUtil.getLocationFromIp(this.req.ip).then(location => {
		this.props.location = location
	}).then(() => {
		this.cookies.set('radius', JSON.stringify(this.props.radius))
		this.cookies.set('location', JSON.stringify(this.props.location))
		next()
	}).catch(next)
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
