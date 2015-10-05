var ENV = 
	process.env.NODE_ENV = 
	process.env.NODE_ENV || 'development'

if(ENV == 'production') {
	process.env.NODE_ENV = 'production'
	process.env.PROD_TYPE = 'production'
}

if(ENV == 'staging') {
	process.env.NODE_ENV = 'production'
	process.env.PROD_TYPE = 'staging'
}

if(ENV == 'development') {
	process.env.NODE_ENV = 'development'
	process.env.PROD_TYPE = ''
}

global.__SERVER__ = true
global.__BROWSER__ = false