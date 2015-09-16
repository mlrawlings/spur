var React = require('react')
  , Button = require('../core/button')

var styles = {}

styles.send = {
	backgroundColor:'rgb(0,132,255)'
}

class FacebookSendButton extends React.Component {
	onClick(e) {
		if(!/android|ios/i.test(navigator.userAgent)) {
			FB.ui({
				method: 'send',
				link: window.location.href,
			})
			e.preventDefault()
		}
	}
	render() {
		return (
			<Button onClick={this.onClick} style={{...styles.send, ...this.props.style}} src="/images/messenger-icon-white.png">
				{this.props.children || 'Send'}
			</Button>
		)
	}
}

module.exports = FacebookSendButton