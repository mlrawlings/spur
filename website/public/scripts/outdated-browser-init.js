;(function() {

    var div = document.createElement('div')
    div.id = 'outdated'
    document.body.insertBefore(div, document.body.firstChild)

	outdatedBrowser({
	    browserSupport: {
	        'Chrome': 44, // 21 Includes Chrome for mobile devices
	        'IE': 10,
	        'Safari': 6.1,
	        'Mobile Safari': 7.1,
	        'Firefox': 28
	    },
		requireChromeOnAndroid: true
	})

})()