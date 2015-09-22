require('./json-date-parse')

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
			request.then = function(onFulfill, onReject) {
				return (new Promise((resolve, reject) => {
					request.end(function(err, response) {
						if(err) return reject(err)
						resolve(response)
					})
				})).then(function(response) {
					try {
						return JSON.parse(response.text)
					} catch(e) {
						try {
							return qs.parse(response.text)
						} catch(e) {
							return response.text
						}
					}
				}).then(onFulfill, onReject)
			}
			modifyRequest(request)
			return request
		}
	})

	api['delete'] = api.del

	return api
}