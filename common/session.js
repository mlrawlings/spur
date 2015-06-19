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

session.sign = function(value) {
	var cookie = require('cookie-signature')
	return cookie.sign(value, secret)
}

session.unsign = function(value) {
	var cookie = require('cookie-signature')
	return cookie.unsign(value, secret)
}
