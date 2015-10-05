var React = require('react')
  , outdatedBrowserRework = require("outdated-browser-rework")

class OutdatedBrowser extends React.Component {
	componentDidMount() {
		outdatedBrowserRework({
		    browserSupport: {
		        'Chrome': 21, // Includes Chrome for mobile devices
		        'IE': 10,
		        'Safari': 6.1,
		        'Mobile Safari': 7.1,
		        'Firefox': 28
		    },
    		requireChromeOnAndroid: true
		})
	}
	render() {
		return <div id="outdated"></div>
	}
}

module.exports = OutdatedBrowser