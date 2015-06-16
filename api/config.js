if(process.env.NODE_ENV != 'production') { 
	//DEVELOPMENT CONFIG
	exports.db = {
		host: 'localhost',
		port: 28015,
		db: 'spur'
	}
}

if(process.env.NODE_ENV == 'production') {
	//PRODUCTION CONFIG
	exports.db = {}
}