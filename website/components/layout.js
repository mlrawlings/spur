var React = require('react')

module.exports = React.createClass({
	render: function() {
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
				<header className="main">
					<div className="content">
						<a href="/">
							<img className="logo" src="/images/spur-logo.png" />
						</a>
						<button className="facebook icon">
							<img src="/images/facebook-icon-white.png" />
							<span>Log in</span>
						</button>
						<nav>
							<a href="/events">
								<span>Browse</span>
							</a>
							<a href="">
								<span>Businesses</span>
							</a>
						</nav>
					</div>
				</header>

				<div id="app" dangerouslySetInnerHTML={{ __html:this.props.componentMarkup }}></div>

				<footer className="main">
					<div className="content">
						<span className="text">Made with &hearts; by Embark in Roanoke, VA</span>
					</div>
				</footer>

			</body>

			<script src="https://fb.me/react-0.13.3.js"></script>

			</html>
		)
	}
})