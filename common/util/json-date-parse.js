var __parse = JSON.parse

JSON.parse = function(string, reviver) {
	reviver = reviver === undefined ? dateReviver : reviver
	return __parse(string, reviver)
}

function dateReviver(key, val) {
	var reggie = /^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}(?:\:\d{2}(?:\.\d+)?)?)(Z|[+-]\d{2}:?\d{2})$/
	if(typeof val == 'string' && reggie.test(val)) {
		return new Date(val)
	}
	return val
}