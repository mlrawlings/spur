exports.format = function(time, timezoneOffset) {
	time = exports.getDateParts(time, timezoneOffset)

	var hours = time.hours
	  , minutes = time.minutes
	  , ampm = hours < 12 ? 'am' : 'pm'

	hours %= 12
	hours = hours || 12

	minutes = (minutes < 10 ? '0' : '') + minutes

	return hours+':'+minutes+' '+ampm
}

exports.getTimeClass = function(time, timezoneOffset) {
	var timeParts = exports.getDateParts(time, timezoneOffset)
	  , hours = timeParts.hours
	  , monthNames = ["January", "February", "March", "April", "May", "June",
			"July", "August", "September", "October", "November", "December"
		]

	if(exports.isToday(time, timezoneOffset)) {
		if(hours < 4) {
			if(exports.getDateParts(new Date()).hours < 4) {
				return 'Late Tonight/Early This Morning'
			} else {
				return 'Late Last Night/Early This Morning'
			}
		} else if(hours >= 4 && hours < 12) {
			return 'This Morning'
		} else if(hours >= 12 && hours < 17) {
			return 'This Afternoon'
		} else if(hours >= 17 && hours < 21) {
			return 'This Evening'
		} else {
			return 'Tonight'
		}
	} else if(exports.isTomorrow(time, timezoneOffset)) {
		if(hours < 4) {
			return 'Late Tonight/Early Tomorrow Morning'
		} else if(hours >= 4 && hours < 12) {
			return 'Tomorrow Morning'
		} else if(hours >= 12 && hours < 17) {
			return 'Tomorrow Afternoon'
		} else if(hours >= 17 && hours < 21) {
			return 'Tomorrow Evening'
		} else {
			return 'Tomorrow Night'
		}
	} else if(exports.isYesterday(time, timezoneOffset)) {
		return 'Yesterday'
	} else {
		return monthNames[timeParts.month] + ' ' + timeParts.date + ', ' + timeParts.year
	}
}

exports.isToday = function(time, timezoneOffset) {
	var timeParts = exports.getDateParts(time, timezoneOffset)

	var now = exports.getDateParts(new Date(), timezoneOffset)

	return timeParts.year == now.year && timeParts.month == now.month && timeParts.date == now.date
}

exports.isTomorrow = function(time, timezoneOffset) {
	var timeParts = exports.getDateParts(time, timezoneOffset)

	var tomorrow = new Date()
	tomorrow.setDate(tomorrow.getDate()+1)

	tomorrow = exports.getDateParts(tomorrow, timezoneOffset)

	return timeParts.year == tomorrow.year && timeParts.month == tomorrow.month && timeParts.date == tomorrow.date
}

exports.isYesterday = function(time, timezoneOffset) {
	var timeParts = exports.getDateParts(time, timezoneOffset)

	var yesterday = new Date()
	yesterday.setDate(yesterday.getDate()-1)

	yesterday = exports.getDateParts(yesterday, timezoneOffset)

	return timeParts.year == yesterday.year && timeParts.month == yesterday.month && timeParts.date == yesterday.date
}

exports.getRelativeTimeString = function(time, options) {
	options = options || {}
	options.postfix = options.postfix || (isPast => isPast ? 'ago' : 'from now')
	
	var now = options && options.relativeTo || new Date()
	now.setSeconds(0)
	now.setMilliseconds(0)
	time.setSeconds(0)
	time.setMilliseconds(0)

	var diff = time.getTime() - now.getTime()
	  , isPast = diff <= 0
	  , endText = ' '+options.postfix(isPast).trim()

	diff = Math.abs(diff)

	var days = Math.floor(diff/(24*60*60*1000))
	  , hours = Math.floor(diff/(60*60*1000)) - days*24
	  , minutes = Math.floor(diff/(60*1000)) - days*24*60 - hours*60

	minutes = minutes < 0 ? minutes+60 : minutes

	if(isPast && options.futureOnly) {
		return 'just now'
	}

	if(days) {
		return days + ' day' + endText
	}

	if(hours && minutes) {
		return hours + 'h ' + minutes + 'm' + endText
	}

	if(hours) {
		return hours + ' hr' + endText
	}

	if(minutes) {
		return minutes + ' min' + endText
	}

	return 'just now'
}

exports.anHourFromNow = function(roundToNearest15) {
	var time = new Date()

	time.setHours(time.getHours()+1)

	if(roundToNearest15) {
		time = exports.roundToNearest15(time)
	}

	return time
}

exports.roundToNearest15 = function(time) {
	var originalMinutes = time.getMinutes()
	  , difference = originalMinutes % 15

	if(difference <= 7) {
		time.setMinutes(originalMinutes-difference)
	} else {
		time.setMinutes(originalMinutes+15-difference)
	}

	time.setSeconds(0)

	return time
}

exports.getMsUntilNextMinute = function() {
	return 60000 - Date.now() % 60000
}

exports.parseTime = function(string, date) {
	var regex = /^\s*(\d+)(?:[^\w\d]+(\d+)?)?\s*(a|am|p|pm)?\s*$/
	  , matches = regex.exec(string.toLowerCase())
	  , result = new Date(date.getTime())

	if(!matches)
		throw new Error('Not a valid Time')

	var hours = parseInt(matches[1])
	  , minutes = parseInt(matches[2]) || 0

	if(hours >= 24)
		throw new Error('Hours can\'t be >= 24')

	if(minutes >= 60)
		throw new Error('Minutes can\'t be >= 60')

	if(matches[3]) {
		hours %= 12
		if(matches[3][0] == 'p')
			hours += 12
	}

	result.setHours(hours)
	result.setMinutes(minutes)

	return result

}

exports.sixHoursFrom = function(time) {
	time = new Date(time)
	time.setHours(time.getHours()+6)

	return time
}

exports.getDateParts = function(time, timezoneOffset) {
	timezoneOffset = timezoneOffset || time.getTimezoneOffset()

	var adjustedTime = new Date(time)
	adjustedTime.setUTCMinutes(adjustedTime.getUTCMinutes() - timezoneOffset)
	
	return { 
		year:adjustedTime.getUTCFullYear(), 
		month:adjustedTime.getUTCMonth(), 
		date:adjustedTime.getUTCDate(),
		hours:adjustedTime.getUTCHours(),
		minutes:adjustedTime.getUTCMinutes(),
		seconds:adjustedTime.getUTCSeconds(),
		timezoneOffset:timezoneOffset
	}
}

