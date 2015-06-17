var express = require('express')
  , router = express()
  , TimeService = require('./services/time')
  , request = require('superagent')
  , qs = require('qs')
  , r = require('rethinkdb')
  , session = require('express-session')

router.use(session({
	secret: 'SDFJK234789sdfjkl23789SDFKLJ!#$%&*('
}))

router.post('/auth'/*, session*/, function(req, res, next) {
	request('https://graph.facebook.com/oauth/access_token').query({
		grant_type:'fb_exchange_token',
		client_id:'1455687261396384',
		client_secret:'dd4dabdb7190bf9a91550729a39c7e34',
		fb_exchange_token:req.query.access_token
	}).end(function(err, response) {
		if(err) return next(err)

		var access_token = qs.parse(response.text).access_token
		
		request('https://graph.facebook.com/v2.3/me').query({
			access_token:access_token
		}).end(function(err, response) {
			var user = JSON.parse(response.text)

			req.session.fbid = user.id
			req.session.token = access_token

			res.json({ fbid:user.id, token:access_token, session:req.sessionID })
		})
	})
})

router.delete('/auth'/*, session*/, function(req, res, next) {
	req.session.destroy(function(err) {
		if(err) return next(err)

		res.end()
	})
})

// Gets all moments, auto filter no past moments, none after tomorrow 3:45am
router.get('/moments', function(req, res, next) {
	console.log(req.session.fbid)
	var now = new Date()
	  , anHourAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours()-1)
	  , end = TimeService.getEndOfTomorrow(now)

	r.table('moment').filter(
		r.row('datetime').gt(anHourAgo).and(r.row('datetime').lt(end))
	).run(req.db).then(function(moments) {
		return moments.toArray()
	}).then(function(moments) {
		res.json(moments)
	}).catch(next)
})

// Get moment by id
router.get('/moments/:id', function(req, res, next) {
	r.table('moment').get(req.params.id).run(req.db).then(function(moment) {
		res.json(moment)
	}).catch(next)
})

// Create moment
router.post('/moments'/*, session, bodyParser*/, function(req, res, next) {
	var now = new Date()
	req.body.datetime = new Date(req.body.datetime)

	if(!req.body.title) throw new Error('title is required')
	if(!req.body.datetime) throw new Error('time is required')
	if(!req.body.location) throw new Error('location is required')
	if(req.body.datetime <= now || req.body.datetime > TimeService.getEndOfTomorrow(now)) throw new Error('time outside of boundaries')

	r.table('moment').insert(req.body).run(req.db).then(function(moment) {
		res.json(moment.generated_keys[0])
	}).catch(next)
})

// Create a post on a moment
// router.post('/moments/:id/posts', session, bodyParser, function(req, res, next){})

// I'm in
// router.post('/moments/:id/attendees', session, function(req, res, next){})

// I'm out
// router.delete('/moments/:id/attendees', session, function(req, res, next){})

module.exports = router