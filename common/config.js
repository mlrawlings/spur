var merge = require('deep-assign')
  , defaultConfig = {}
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
	defaultConfig.rethink = {
		host: 'local.tryspur.com',
		port: 28015,
		db: 'spur'
	}

	defaultConfig.redis = {
		host: 'local.tryspur.com',
		port: 6379
	}

	defaultConfig.api = {
		protocol: 'http',
		host: 'local.tryspur.com',
		port: 7788
	}

	defaultConfig.webserver = {
		protocol: 'http',
		host: 'local.tryspur.com',
		port: 7787
	}

	defaultConfig.facebook = {
		appId: 1455687261396384,
		appSecret: __SERVER__ && 'dd4dabdb7190bf9a91550729a39c7e34',
		version: 'v2.3'
	}
}

module.exports = merge({}, defaultConfig, localConfig)