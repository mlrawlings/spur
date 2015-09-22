var merge = require('deep-assign')
  , defaultConfig
  , localConfig

try {
	localConfig = require('./config.local.js')
} catch(e) {
	localConfig = {}
}

if(process.env.NODE_ENV == 'production') {
	/* PRODUCTION */
	defaultConfig = {}
} else {
	/* DEVELOPMENT */
	defaultConfig = {
		rethink: {
			host:'local.tryspur.com',
			port: 28015,
			db: 'spur'
		},
		redis: {
			host: 'local.tryspur.com',
			port: 6379
		},
		api: {
			protocol: 'http',
			host: 'local.tryspur.com',
			port: 7788
		},
		webserver: {
			protocol: 'http',
			host: 'local.tryspur.com',
			port: 7787
		}
	}
}

module.exports = merge({}, defaultConfig, localConfig)