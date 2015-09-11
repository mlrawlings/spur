var React = require('react')

class HTML extends React.Component {
	render() {
		return (
			<html>
			<head>
				<title>Spur | {this.props.title}</title>
				<link rel="shortcut icon" href="/favicon.ico" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:400,300,700,600" />
				<link rel="stylesheet" href="/styles/core.css" />
				<link rel="stylesheet" href="/styles/home.css" />
				<link rel="stylesheet" href="/styles/events.css" />
				<link rel="stylesheet" href="/styles/create-event.css" />
			</head>
			<body>
				<div id="app" dangerouslySetInnerHTML={{ __html:this.props.viewMarkup }}></div>
				<script src="//connect.facebook.net/en_US/sdk.js" async></script>
			</body>
			</html>
		)
	}
}

module.exports = HTML