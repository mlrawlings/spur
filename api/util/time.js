exports.getEndOfTomorrow = function(time) {
	return new Date(time.getFullYear(), time.getMonth(), time.getDate()+1, 23, 59, 59)
}