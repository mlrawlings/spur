var time = require('./time')

describe('time', () => {

	describe('getRelativeTimeString', () => {
		it('same times given', () => {
			var now = new Date()
			  , timeFromNow = now
			
			time.getRelativeTimeString(timeFromNow, { relativeTo:now }).should.be.eql('just now')
		})
		it('1 min', () => {
			var now = new Date()
			  , timeFromNow = new Date()

			timeFromNow.setMinutes(now.getMinutes()+1)
			
			time.getRelativeTimeString(timeFromNow, { relativeTo:now }).should.be.eql('1 min from now')
		})
		it('24 min', () => {
			var now = new Date()
			  , timeFromNow = new Date()

			timeFromNow.setMinutes(now.getMinutes()+24)
			
			time.getRelativeTimeString(timeFromNow, { relativeTo:now }).should.be.eql('24 min from now')
		})
		it('1 hr', () => {
			var now = new Date()
			  , timeFromNow = new Date()

			timeFromNow.setHours(now.getHours()+1)
			
			time.getRelativeTimeString(timeFromNow, { relativeTo:now }).should.be.eql('1 hr from now')
		})
		it('1h 1m', () => {
			var now = new Date()
			  , timeFromNow = new Date()

			timeFromNow.setHours(now.getHours()+1)
			timeFromNow.setMinutes(now.getMinutes()+1)
			
			time.getRelativeTimeString(timeFromNow, { relativeTo:now }).should.be.eql('1h 1m from now')
		})
		it('23h 59m', () => {
			var now = new Date()
			  , timeFromNow = new Date()

			timeFromNow.setHours(now.getHours()+23)
			timeFromNow.setMinutes(now.getMinutes()+59)
			
			time.getRelativeTimeString(timeFromNow, { relativeTo:now }).should.be.eql('23h 59m from now')
		})
		it('1 day', () => {
			var now = new Date()
			  , timeFromNow = new Date()

			timeFromNow.setDate(now.getDate()+1)
			
			time.getRelativeTimeString(timeFromNow, { relativeTo:now }).should.be.eql('1 day from now')
		})
		it('1 day', () => {
			var now = new Date()
			  , timeFromNow = new Date()

			timeFromNow.setDate(now.getDate()+1)
			timeFromNow.setHours(now.getHours()+23)
			
			time.getRelativeTimeString(timeFromNow, { relativeTo:now }).should.be.eql('1 day from now')
		})
		it('2 day', () => {
			var now = new Date()
			  , timeFromNow = new Date()

			timeFromNow.setDate(now.getDate()+2)
			timeFromNow.setHours(now.getHours()+1)
			
			time.getRelativeTimeString(timeFromNow, { relativeTo:now }).should.be.eql('2 day from now')
		})



		it('only 1 second away but minutes are different', () => {
			var then = new Date()
			  , timeFromThen = new Date()

			then.setSeconds(59)
			timeFromThen.setSeconds(0)
			timeFromThen.setMinutes(then.getMinutes()+1)
			
			time.getRelativeTimeString(timeFromThen, { relativeTo:then }).should.be.eql('1 min from now')
		})
		it('clock says an hour from now even though it is slightly less than that', () => {
			var then = new Date()
			  , timeFromThen = new Date()

			then.setSeconds(59)
			then.setHours(10)
			timeFromThen.setSeconds(0)
			timeFromThen.setHours(then.getHours()+1)
			
			time.getRelativeTimeString(timeFromThen, { relativeTo:then }).should.be.eql('1 hr from now')
		})
		it('past time', () => {
			var then = new Date()
			  , timeFromThen = new Date()

			then.setSeconds(59)
			timeFromThen.setSeconds(0)
			timeFromThen.setHours(then.getHours()-1)
			
			time.getRelativeTimeString(timeFromThen, { relativeTo:then }).should.be.eql('1 hr ago')
		})
	})

	describe('parseTime', () => {
		it('1 -> 1:00 am', () => {
			var timeString = '1'
			  , now = new Date()
			  , result = time.parseTime(timeString, now)

			result.getHours().should.be.eql(1)
			result.getMinutes().should.be.eql(0)
		})
		it('13 -> 1:00 pm', () => {
			var timeString = '13'
			  , now = new Date()
			  , result = time.parseTime(timeString, now)

			result.getHours().should.be.eql(13)
			result.getMinutes().should.be.eql(0)
		})
		it('1: -> 1:00 am', () => {
			var timeString = '1:'
			  , now = new Date()
			  , result = time.parseTime(timeString, now)

			result.getHours().should.be.eql(1)
			result.getMinutes().should.be.eql(0)
		})
		it('1:1 -> 1:01 am', () => {
			var timeString = '1:1'
			  , now = new Date()
			  , result = time.parseTime(timeString, now)

			result.getHours().should.be.eql(1)
			result.getMinutes().should.be.eql(1)
		})
		it('1:11 -> 1:11 am', () => {
			var timeString = '1:11'
			  , now = new Date()
			  , result = time.parseTime(timeString, now)

			result.getHours().should.be.eql(1)
			result.getMinutes().should.be.eql(11)
		})
		it('12:35 -> 12:35 pm', () => {
			var timeString = '12:35'
			  , now = new Date()
			  , result = time.parseTime(timeString, now)

			result.getHours().should.be.eql(12)
			result.getMinutes().should.be.eql(35)
		})
		it('12:35 am -> 12:35 am', () => {
			var timeString = '12:35 am'
			  , now = new Date()
			  , result = time.parseTime(timeString, now)

			result.getHours().should.be.eql(0)
			result.getMinutes().should.be.eql(35)
		})
		it('1p -> 1:00 pm', () => {
			var timeString = '1p'
			  , now = new Date()
			  , result = time.parseTime(timeString, now)

			result.getHours().should.be.eql(13)
			result.getMinutes().should.be.eql(0)
		})
		it('1:p -> 1:00 pm', () => {
			var timeString = '1:p'
			  , now = new Date()
			  , result = time.parseTime(timeString, now)

			result.getHours().should.be.eql(13)
			result.getMinutes().should.be.eql(0)
		})
		it('13pm -> 1:00 pm', () => {
			var timeString = '13pm'
			  , now = new Date()
			  , result = time.parseTime(timeString, now)

			result.getHours().should.be.eql(13)
			result.getMinutes().should.be.eql(0)
		})
		it('1 53 -> 1:53 am', () => {
			var timeString = '1 53'
			  , now = new Date()
			  , result = time.parseTime(timeString, now)

			result.getHours().should.be.eql(1)
			result.getMinutes().should.be.eql(53)
		})
		it('5:00 PM -> 5:00 pm', () => {
			var timeString = '5:00 PM'
			  , now = new Date()
			  , result = time.parseTime(timeString, now)

			result.getHours().should.be.eql(17)
			result.getMinutes().should.be.eql(0)
		})
		it(' 5:00 PM -> 5:00 pm', () => {
			var timeString = ' 5:00 PM'
			  , now = new Date()
			  , result = time.parseTime(timeString, now)

			result.getHours().should.be.eql(17)
			result.getMinutes().should.be.eql(0)
		})
		it('5:00 PM           -> 5:00 pm', () => {
			var timeString = '5:00 PM           '
			  , now = new Date()
			  , result = time.parseTime(timeString, now)

			result.getHours().should.be.eql(17)
			result.getMinutes().should.be.eql(0)
		})


		
		it('1a:p -> Not a valid Time', () => {
			var timeString = '1a:p'
			  , now = new Date()

			;(function() {
				time.parseTime(timeString, now)
			}).should.throw('Not a valid Time')
		})
		
		it('25 -> Hours can\'t be >= 24', () => {
			var timeString = '24'
			  , now = new Date()

			;(function() {
				time.parseTime(timeString, now)
			}).should.throw('Hours can\'t be >= 24')
		})

		it('5:61 PM -> throws Minutes can\'t be >= 60', () => {
			var timeString = '5:60 PM'
			  , now = new Date()

			;(function() {
				time.parseTime(timeString, now)
			}).should.throw('Minutes can\'t be >= 60')
		})

	})

})