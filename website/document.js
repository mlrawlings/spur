var React = require('react')
  , config = require('../common/config')
  , isDev = process.env.NODE_ENV == 'development'

module.exports = function(next) {

	this.document.title = 'Spur | Live in the Moment'

	this.document.links = [
		{ rel:'shortcut icon', href:'/favicon.ico' }
	]

	this.document.scripts = [
		'/scripts/ua-parser.min.js',
		'/scripts/outdated-browser.js',
		'/scripts/outdated-browser-init.js',
		'/scripts/alertify.js-0.3.11/lib/alertify.min.js',
		'https://cdnjs.cloudflare.com/ajax/libs/es6-promise/3.0.2/es6-promise.min.js',
		'https://cdnjs.cloudflare.com/ajax/libs/react/'+React.version+'/react'+(isDev ? '' : '.min')+'.js',
		'https://cdnjs.cloudflare.com/ajax/libs/react/'+React.version+'/react-dom'+(isDev ? '' : '.min')+'.js',
		{ src:'https://connect.facebook.net/en_US/sdk.js', async:true },
        'https://maps.google.com/maps/api/js?sensor=false&libraries=places',
		'/dist/app.js'
	]

	this.document.styles = [
		'https://fonts.googleapis.com/css?family=Open+Sans:400,300,700,600',
		'https://cdnjs.cloudflare.com/ajax/libs/normalize/3.0.3/normalize.min.css',
		'/styles/core.css',
		'/styles/outdatedbrowser.css',
		'/scripts/alertify.js-0.3.11/themes/alertify.core.css',
		'/scripts/alertify.js-0.3.11/themes/alertify.default.css'
	]

	this.document.meta = [
		{ name:'viewport', content:'width=device-width, initial-scale=1, maximum-scale=1' },
		{ property:'og:site_name', content:'Spur' },
		{ property:'fb:app_id', content:config.facebook.appId },
		{ property:'og:locale', content:'en_US' },
		{ property:'og:type', content:'article' }
	]

	next()
}