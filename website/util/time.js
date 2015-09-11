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
	  , today = time.getDay() == new Date().getDay()

	if(today){
		if(hours < 4) {
			return 'Late Tonight/Early Today'
		} else if(hours >= 4 && hours < 12) {
			return 'This Morning'
		} else if(hours >= 12 && hours < 17) {
			return 'This Afternoon'
		} else if(hours >= 17 && hours < 21) {
			return 'This Evening'
		} else {
			return 'Tonight'
		}
	} else {
		if(hours < 4) {
			return 'Late Tonight/Early Tomorrow'
		} else if(hours >= 4 && hours < 12) {
			return 'Tomorrow Morning'
		} else if(hours >= 12 && hours < 17) {
			return 'Tomorrow Afternoon'
		} else if(hours >= 17 && hours < 21) {
			return 'Tomorrow Evening'
		} else {
			return 'Tomorrow Night'
		}
	}
}

exports.getRelativeTimeString = function(time, current) {
	var now = current || new Date()
	  , diff = time.getTime() - now.getTime()
	  , days = Math.floor(diff/(24*60*60*1000))
	  , hours = Math.floor(diff/(60*60*1000)) - days*24
	  , minutes = time.getMinutes() - now.getMinutes()

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
		time.setMinutes(originalMinutes+difference)
	}

	time.setSeconds(0)

	return time
}

exports.getMsUntilNextMinute = function() {
	return 60000 - Date.now() % 60000
}