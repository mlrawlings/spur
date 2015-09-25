var createApi = require('../common/util/create-api')
  , config = require('../common/config')
  , apiRoot

if(process.env.NODE_ENV == 'production') {
	apiRoot = config.api.protocol+'://'+config.api.host+':'+config.api.port
} else if(typeof window != 'undefined') {
	apiRoot = window.location.protocol + '//' + window.location.hostname + ':' + config.api.port
} else {
	apiRoot = config.api.protocol+'://localhost:'+config.api.port
}

function createSpurClient(cookies) {
	return createApi(apiRoot, function(request) {
		request.set('Content-Type', 'application/json')
		
		if(typeof window !== 'undefined') {
			return request.withCredentials()
		}

		cookies && request.set('Cookie', cookies)
	})
}

module.exports = createSpurClient()
module.exports.createInstance = createSpurClient