exports.format = function(time) {
	var hours = time.getHours()
	  , minutes = time.getMinutes()
	  , ampm = hours < 12 ? 'am' : 'pm'

	hours %= 12
	hours = hours || 12

	minutes = (minutes < 10 ? '0' : '') + minutes

	return hours+':'+minutes+' '+ampm
}

exports.getTimeClass = function(time) {
	var hours = time.getHours()
	  , monthNames = ["January", "February", "March", "April", "May", "June",
			"July", "August", "September", "October", "November", "December"
		]

	if(exports.isToday(time)) {
		if(hours < 4) {
			if(new Date().getHours() < 4) {
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
	} else if(exports.isTomorrow(time)) {
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
	} else if(exports.isYesterday(time)) {
		return 'Yesterday'
	} else {
		return monthNames[time.getMonth()] + ' ' + time.getDate() + ', ' + time.getFullYear()
	}
}

exports.isToday = function(time) {
	var now = new Date()

	return time.getFullYear() == now.getFullYear() && time.getMonth() == now.getMonth() && time.getDate() == now.getDate()
}

exports.isTomorrow = function(time) {
	var tomorrow = new Date()
	tomorrow.setDate(tomorrow.getDate()+1)

	return time.getFullYear() == tomorrow.getFullYear() && time.getMonth() == tomorrow.getMonth() && time.getDate() == tomorrow.getDate()
}

exports.isYesterday = function(time) {
	var yesterday = new Date()
	yesterday.setDate(yesterday.getDate()-1)

	return time.getFullYear() == yesterday.getFullYear() && time.getMonth() == yesterday.getMonth() && time.getDate() == yesterday.getDate()
}

exports.getRelativeTimeString = function(time, current) {
	var now = current || new Date()
	now.setSeconds(0)
	now.setMilliseconds(0)
	time.setSeconds(0)
	time.setMilliseconds(0)

	var diff = time.getTime() - now.getTime()
	  , days = Math.floor(diff/(24*60*60*1000))
	  , hours = Math.floor(diff/(60*60*1000)) - days*24
	  , minutes = Math.floor(diff/(60*1000)) - days*24*60 - hours*60//time.getMinutes() - now.getMinutes()

	minutes = minutes < 0 ? minutes+60 : minutes

	if(diff <= 0) {
		return 'started'
	}

	if(days) {
		return days + ' day'
	}

	if(hours && minutes) {
		return hours + 'h ' + minutes + 'm'
	}

	if(hours) {
		return hours + ' hr'
	}

	if(minutes) {
		return minutes + ' min'
	}
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