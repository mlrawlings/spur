var React = require('react')
  , FacebookLoginButton = require('./facebook-login-button')

class Layout extends React.Component {
	render() {
		return (
			<div>
				<header className="main">
					<div className="content">
						<a href="/">
							<img className="logo" src="/images/spur-logo.png" />
						</a>
						<FacebookLoginButton userId={this.props.fbid} />
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

				<div>
					{this.props.children}
				</div>

				<footer className="main">
					<div className="content">
						<span className="text">Made with &hearts; by Embark in Roanoke, VA</span>
					</div>
				</footer>
			</div>
		)
	}
}

module.exports = Layout