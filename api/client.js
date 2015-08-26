var createApi = require('../common/util/create-api')
  , config = require('../common/config')
  , apiRoot = config.api.protocol+'://'+config.api.host+':'+config.api.port

require('../common/util/json-date-parse')

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