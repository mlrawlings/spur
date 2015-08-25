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

exports.anHourFromNow = function() {

}