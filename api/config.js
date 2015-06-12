if(process.env.NODE_ENV != 'production') { 
	//DEVELOPMENT CONFIG
	exports.db = 'mongodb://localhost/spur'
}

if(process.env.NODE_ENV == 'production') {
	//PRODUCTION CONFIG
	exports.db = ''
}