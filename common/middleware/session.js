var session = require('express-session')
  , RedisStore = require('connect-redis')(session)
  , config = require('../config')
  , secret = 'SDFJK234789sdfjkl23789SDFKLJ!#$%&*('

module.exports = session({
	name: 'session',
	secret: secret,
	resave: false,
	saveUninitialized: true,
	cookie: {
		httpOnly: false
	},
	store: new RedisStore(config.redis)
})