var express = require('express')
  , router = express()
  , Moment = require('./models/moment')

// Gets all moments, auto filter no past moments, none after tomorrow 3:45am
router.get('/moments', function(req, res) {
	Moment.find({}, function(err, moments) {
		if(err) throw new Error(err)
		
		res.json(moments)
	})
})

// Get moment by id
router.get('/moments/:eid', function(req, res) {
	Moment.findById(req.params.eid, function(err, moment) {
		if(err) throw new Error(err)

		res.json(moment)
	})
})

// Create moment
router.post('/moments', function(req, res) {
	if(!req.body.title) throw new Error('title is required')
	if(!req.body.time) throw new Error('time is required')
	if(!req.body.location) throw new Error('location is required')

	var moment = new Moment({
		title: req.body.title,
		time: req.body.time,
		location: {
			lat: req.body.location.lat,
			lng: req.body.location.lng,
			address: req.body.location.address,
			name: req.body.location.name
		}
	})

	moment.save(function(err, moment) {
		if(err) throw new Error(err)

		res.json(moment)
	})
})

module.exports = router