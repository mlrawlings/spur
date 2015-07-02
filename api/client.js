var url = require('url')
  , methods = require('methods')
  , request = require('superagent')
  , config = require('../common/config')
  , apiRoot = config.api.protocol+'://'+config.api.host+':'+config.api.port

function createInstance(cookies) {
	var api = {}

	methods.forEach(function(method) {
		method = 'delete' == method ? 'del' : method
		
		api[method] = function(path) {
			var req = createBasicRequest(method, path)

			if(typeof window !== 'undefined') {
				return req.withCredentials()
			}

			return cookies ? req.set('Cookie', cookies) : req
		}
	})

	api['delete'] = api.del

	return api
}

function createBasicRequest(method, path) {
	path = url.resolve(apiRoot, path)
	return request[method](path).set('Content-Type', 'application/json')
}

module.exports = createInstance()
module.exports.createInstance = createInstance