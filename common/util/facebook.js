var createApi = require('./create-api')
  , graphRoot = 'https://graph.facebook.com/v2.3/'
  , qs = require('qs')
  , fb
  , config = require('../config')

function createFacebookClient(token) {
	return createApi(graphRoot, function(request) {
		token && request.query({ access_token:token })
	})
}

function exchangeToken(token, cb) {
	return new Promise(function(resolve, reject) {
		fb.get('/oauth/access_token').query({
			grant_type: 'fb_exchange_token',
			client_id: config.facebook.appId,
			client_secret: config.facebook.appSecret,
			fb_exchange_token: token
		}).end(function(err, response) {
			if(err) return reject(err)
			resolve(qs.parse(response.text).access_token)
		})
	})
}

module.exports = fb = createFacebookClient()
module.exports.createInstance = createFacebookClient
module.exports.exchangeToken = exchangeToken