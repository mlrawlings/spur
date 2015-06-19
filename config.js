var merge = require('deep-defaults')
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
			host:'localhost',
			port: 28015,
			db: 'spur'
		},
		redis: {
			host: 'localhost',
			port: 6379
		},
		api: {
			protocol: 'http',
			host: 'localhost',
			port: 7788
		},
		webserver: {
			protocol: 'http',
			host: 'localhost',
			port: 7787
		}
	}
}

module.exports = merge(localConfig, defaultConfig)