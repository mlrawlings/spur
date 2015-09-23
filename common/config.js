var merge = require('deep-assign')
  , config = {}

if(process.env.NODE_ENV == 'production') {
	/* PRODUCTION */
	config = {}
}

if(process.env.NODE_ENV === 'development') {
	/* DEVELOPMENT */
	config.rethink = {
		host: 'local.tryspur.com',
		port: 28015,
		db: 'spur'
	}

	config.redis = {
		host: 'local.tryspur.com',
		port: 6379
	}

	config.api = {
		protocol: 'http',
		host: 'local.tryspur.com',
		port: 7788
	}

	config.webserver = {
		protocol: 'http',
		host: 'local.tryspur.com',
		port: 7787
	}

	config.facebook = {
		appId: 1455687261396384,
		appSecret: __SERVER__ && 'dd4dabdb7190bf9a91550729a39c7e34',
		version: 'v2.3'
	}

	try {
		config = merge({}, config, require('./config.local.js'))
	} catch(e) {}
}

module.exports = config