var url = require('url')
  , request = require('superagent')
  , methods = require('methods')
  , config = require('../../common/config')
  , apiRoot = config.api.protocol+'://'+config.api.host+':'+config.api.port
  , api = {}

module.exports = function(req, res, next) {
	req.api = api
	methods.forEach(function(method) {
		req.api[method] = function(path) {
			path = url.resolve(apiRoot, path)
			console.log(path)
			return request[method](path).set('Cookie', req.get('cookie'))
		}
	})
	req.api.del = req.api.delete
	next()
}