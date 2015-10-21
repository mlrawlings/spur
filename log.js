require('colors')

var path = require('path')
  , cwd = process.cwd()
  , rel = p => path.relative(cwd, p)
  , format = str => str.replace(/\((.*)\)/, (str, p1) => {
  		var relative = rel(p1)
  		if(relative[0] != '.') relative = './' + relative
  		return '(' + relative.replace(/\\/g, '/') + ')'
 	})

;['log', 'warn'].forEach(function(method) {
	var log = console[method].bind(console)
	console[method] = function() {
		try {
			var stack = (new Error()).stack.split(/\n/)
			if (stack[0].indexOf('Error') === 0) {
				stack = stack.slice(1)
			}
			var args = [].slice.apply(arguments).concat([format(stack[1].trim()).gray.italic])
			return log.apply(console, args)
		} catch(e) { 
			return log.apply(console, arguments)
		}
	}
})