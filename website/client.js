var kent = require('kent/client')
  , kentReact = require('kent-react/client')
  , api = require('../api/client')
  , fb = require('../common/util/facebook')
  , locationUtil = require('./util/location')
  , router = require('./router')
  , app = window.app = kent()
  , config = require('../common/config')

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

window.fbAsyncInit = function() {
	FB.init({
		appId: config.facebook.appId,
		xfbml: false,
		status: true,
		version: config.facebook.version
	})

	FB.getLoginStatus(function onChangeLoginStatus(response) {
		if(response.status == 'connected') {
			var userId = response.authResponse.userID
			
			api.post('/auth?access_token='+response.authResponse.accessToken).then(res => {
				window.user = res.user
			}).catch(e => console.error(e.stack))
		} else {
			api.del('/auth').then(res => {
				window.user = undefined 
			}).catch(e => console.error(e.stack))
		}
	})
}

if(window.FB) window.fbAsyncInit()