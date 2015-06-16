var express = require('express')
  , router = express()
  , TimeService = require('./services/time')
  , r = require('rethinkdb')

// Gets all moments, auto filter no past moments, none after tomorrow 3:45am
router.get('/moments', function(req, res, next) {
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
router.post('/moments', function(req, res, next) {
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
// router.post('/moments/:id/posts')

// I'm in
// router.post('/moments/:id/attendees')

// I'm out
// router.delete('/moments/:id/attendees')

module.exports = router