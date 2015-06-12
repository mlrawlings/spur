var Time = module.exports

Time.getEndOfTomorrow = function(time) {
	var alter = 2
	if(time.getHours() <= 3 || (time.getHours() == 3 && time.getMinutes() <= 45))
		alter = 1

	return new Date(time.getFullYear(), time.getMonth(), time.getDate()+alter, 3, 45)
}