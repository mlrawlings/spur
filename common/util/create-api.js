var url = require('url')
  , methods = require('methods')
  , superagent = require('superagent')

module.exports = function (root, modifyRequest) {
	var api = {}

	methods.forEach(function(method) {
		method = 'delete' == method ? 'del' : method
		
		api[method] = function(path) {
			var absolutePath = url.resolve(root, path)
			  , request = superagent[method](absolutePath)
			modifyRequest(request)
			return request
		}
	})

	api['delete'] = api.del

	return api
}