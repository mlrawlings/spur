var React = require('react')
  , Button = require('../core/button')

var styles = {}

styles.send = {
	backgroundColor:'rgb(0,132,255)'
}

class FacebookSendButton extends React.Component {
	onClick(e) {
		if(!/android|iPad|iPhone|iPod/i.test(navigator.userAgent)) {
			FB.ui({
				method: 'send',
				link: this.props.currentURL + this.props.append
			})
			e.preventDefault()
		} else {
			FB.ui({
				method: 'share',
				href: this.props.currentURL + this.props.append
			})
		}
	}
	render() {
		return (
			<Button onClick={this.onClick.bind(this)} style={{...styles.send, ...this.props.style}} src="/images/messenger-icon-white.png">
				{this.props.children || 'Send'}
			</Button>
		)
	}
}

module.exports = FacebookSendButton