var url = require('url')
  , request = require('superagent')
  , methods = require('methods')
  , config = require('../../common/config')
  , apiRoot = config.api.protocol+'://'+config.api.host+':'+config.api.port
  , api = {}

methods.forEach(function(method) {
	api[method] = function(path) {
		path = url.resolve(apiRoot, path)
		console.log(path)
		return request[method](path).withCredentials()
	}
})
api.del = api.delete

module.exports = api

window.request = request