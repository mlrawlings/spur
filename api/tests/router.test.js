var assert = require("assert")
  , request = require('superagent')
  , mongoose = require('mongoose')
  , mockgoose = require('mockgoose')

mockgoose(mongoose)
require('../server')


describe('router', function() {
	describe('#createMoment()', function() {
		var url = 'http://localhost:8080/api/moments'
		it('should create moment', function() {
			request.post(url).send({
				title: 'Moment 1',
				datetime: new Date(),
				location: {
					lat: -23.3452,
					lng: 34.235432,
					address: '901 College Ave',
					name: 'Location Name' 
				}
			}).end(function(err, res) {
				if(!err) assert.equal(res.body.title, 'Moment 1')
			})
		})
		it('should create moment', function() {
			request.post(url).send({
				title: 'Moment 1',
				datetime: new Date()
			}).end(function(err, res) {
				
			})
		})
	})
})