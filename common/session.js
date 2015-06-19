var session = require('express-session')
  , RedisStore = require('connect-redis')(session)
  , config = require('../config')
  , secret = 'SDFJK234789sdfjkl23789SDFKLJ!#$%&*('

var session = module.exports = session({
	name: 'session',
	secret: secret,
	cookie: {
		httpOnly: false
	},
	store: new RedisStore(config.redis)
})