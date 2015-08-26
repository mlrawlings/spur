var createApi = require('./create-api')
  , graphRoot = 'https://graph.facebook.com/v2.3/'
  , qs = require('qs')
  , fb

function createFacebookClient(token) {
	return createApi(graphRoot, function(request) {
		token && request.query({ access_token:token })
	})
}

function exchangeToken(token, cb) {
	fb.get('/oauth/access_token').query({
		grant_type:'fb_exchange_token',
		client_id:'1455687261396384',
		client_secret:'dd4dabdb7190bf9a91550729a39c7e34',
		fb_exchange_token:token
	}).end(function(err, response) {
		if(err) return cb(err)

		cb(null, qs.parse(response.text).access_token)
	})
}

module.exports = fb = createFacebookClient()
module.exports.createInstance = createFacebookClient
module.exports.exchangeToken = exchangeToken