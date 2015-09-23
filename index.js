global.__SERVER__ = true
global.__BROWSER__ = false
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

require('./babel')
require('./log')
if(!process.argv[2] || process.argv[2] === 'api') require('./api/server')
if(!process.argv[2] || process.argv[2] === 'web') require('./website/server')