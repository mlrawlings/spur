var session = require('express-session')
  , RedisStore = require('connect-redis')(session)

module.exports = session({
	store: new RedisStore({
		host: 'localhost',
		port: 6379
	}),
	secret: 'SDFJK234789sdfjkl23789SDFKLJ!#$%&*(',
	name: 'session',
	cookie: {
		httpOnly: false
	}
})