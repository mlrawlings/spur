var merge = require('deep-assign')
  , config = {}

if(process.env.NODE_ENV == 'production') {
	/* PRODUCTION */
	config.domain = '.tryspur.com'

	config.rethink = {
		host: 'localhost',
		port: 28015,
		db: 'spur'
	}

	config.redis = {
		host: 'localhost',
		port: 6379
	}

	config.api = {
		protocol: __SERVER__ ? 'http' : 'https',
		host: __SERVER__ ? 'localhost' : 'www.tryspur.com',
		port: 7788
	}

	config.webserver = {
		protocol: 'https',
		host: 'www.tryspur.com',
		port: 7787
	}

	config.facebook = {
		appId: 1455687261396384,
		appSecret: __SERVER__ && 'dd4dabdb7190bf9a91550729a39c7e34',
		version: 'v2.3'
	}

	if(process.env.PROD_TYPE == 'staging') {
		/* STAGING */
		config.rethink.db = 'spur-dev'
		config.api.host = __SERVER__ ? 'localhost' : 'dev.tryspur.com',
		config.webserver.host = 'dev.tryspur.com'
	}
}

if(process.env.NODE_ENV === 'development') {
	/* DEVELOPMENT */
	config.domain = '.embark.ws'

	config.rethink = {
		host: 'local.embark.ws',
		port: 28015,
		db: 'spur'
	}

	config.redis = {
		host: 'local.embark.ws',
		port: 6379
	}

	config.api = {
		protocol: 'http',
		host: 'local.embark.ws',
		port: 7788
	}

	config.webserver = {
		protocol: 'http',
		host: 'local.embark.ws',
		port: 7787
	}

	config.facebook = {
		appId: 1497091037256006,
		appSecret: __SERVER__ && '41233dfa7aa3d68de1e6338a4c25ea01',
		version: 'v2.3'
	}

	try {
		config = merge({}, config, require('./config.local.js'))
	} catch(e) {}
}

module.exports = config