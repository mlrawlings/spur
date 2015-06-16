var express = require('express')
  , router = express()
  , Moment = require('./models/moment')
  , TimeService = require('./services/time')

// Gets all moments, auto filter no past moments, none after tomorrow 3:45am
router.get('/moments', function(req, res) {
	var now = new Date()
	  , anHourAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours()-1)
	  , end = TimeService.getEndOfTomorrow(now)

	Moment.find({ $and:[{ datetime: { $gt:anHourAgo } }, { datetime: { $lt: end } }] }, function(err, moments) {
		if(err) throw new Error(err)
		
		res.json(moments)
	})
})

// Get moment by id
router.get('/moments/:id', function(req, res) {
	Moment.findById(req.params.id, function(err, moment) {
		if(err) throw new Error(err)

		res.json(moment)
	})
})

// Create moment
router.post('/moments', function(req, res) {
	var now = new Date()

	if(!req.body.title) throw new Error('title is required')
	if(!req.body.datetime) throw new Error('time is required')
	if(!req.body.location) throw new Error('location is required')
	if(req.body.datetime <= now || req.body.datetime > TimeService.getEndOfTomorrow(now)) throw new Error('time outside of boundaries')

	var moment = new Moment(req.body)

	moment.save(function(err, moment) {
		if(err) throw new Error(err)

		res.json(moment)
	})
})

// Create a post on a moment
router.post('/moments/:id/posts')

// I'm in
router.post('/moments/:id/attendees')

// I'm out
router.delete('/moments/:id/attendees')

module.exports = router