var time = require('./time')

describe('time', () => {
	it('same times given', () => {
		var now = new Date()
		  , timeFromNow = now
		
		time.getRelativeTimeString(timeFromNow, now).should.be.eql('started')
	})
	it('1 min', () => {
		var now = new Date()
		  , timeFromNow = new Date()

		timeFromNow.setMinutes(now.getMinutes()+1)
		
		time.getRelativeTimeString(timeFromNow, now).should.be.eql('1 min')
	})
	it('24 min', () => {
		var now = new Date()
		  , timeFromNow = new Date()

		timeFromNow.setMinutes(now.getMinutes()+24)
		
		time.getRelativeTimeString(timeFromNow, now).should.be.eql('24 min')
	})
	it('1 hr', () => {
		var now = new Date()
		  , timeFromNow = new Date()

		timeFromNow.setHours(now.getHours()+1)
		
		time.getRelativeTimeString(timeFromNow, now).should.be.eql('1 hr')
	})
	it('1h 1m', () => {
		var now = new Date()
		  , timeFromNow = new Date()

		timeFromNow.setHours(now.getHours()+1)
		timeFromNow.setMinutes(now.getMinutes()+1)
		
		time.getRelativeTimeString(timeFromNow, now).should.be.eql('1h 1m')
	})
	it('23h 59m', () => {
		var now = new Date()
		  , timeFromNow = new Date()

		timeFromNow.setHours(now.getHours()+23)
		timeFromNow.setMinutes(now.getMinutes()+59)
		
		time.getRelativeTimeString(timeFromNow, now).should.be.eql('23h 59m')
	})
	it('1 day', () => {
		var now = new Date()
		  , timeFromNow = new Date()

		timeFromNow.setDate(now.getDate()+1)
		
		time.getRelativeTimeString(timeFromNow, now).should.be.eql('1 day')
	})
	it('1 day', () => {
		var now = new Date()
		  , timeFromNow = new Date()

		timeFromNow.setDate(now.getDate()+1)
		timeFromNow.setHours(now.getHours()+23)
		
		time.getRelativeTimeString(timeFromNow, now).should.be.eql('1 day')
	})
	it('2 day', () => {
		var now = new Date()
		  , timeFromNow = new Date()

		timeFromNow.setDate(now.getDate()+2)
		timeFromNow.setHours(now.getHours()+1)
		
		time.getRelativeTimeString(timeFromNow, now).should.be.eql('2 day')
	})



	it('only 1 second away but minutes are different', () => {
		var then = new Date()
		  , timeFromThen = new Date()

		then.setSeconds(59)
		timeFromThen.setSeconds(0)
		timeFromThen.setMinutes(then.getMinutes()+1)
		
		time.getRelativeTimeString(timeFromThen, then).should.be.eql('1 min')
	})
	it('clock says an hour from now even though it is slightly less than that', () => {
		var then = new Date()
		  , timeFromThen = new Date()

		then.setSeconds(59)
		timeFromThen.setSeconds(0)
		timeFromThen.setHours(then.getHours()+1)
		
		time.getRelativeTimeString(timeFromThen, then).should.be.eql('1 hr')
	})
})