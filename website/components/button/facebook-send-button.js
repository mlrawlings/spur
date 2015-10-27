var React = require('react')
  , Button = require('../core/button')

var styles = {}

styles.send = {
	backgroundColor:'rgb(0,132,255)'
}

class FacebookSendButton extends React.Component {
	onClick(e) {
		FB.ui({
			method: 'send',
			link: this.context.url
		})
		e.preventDefault()
	}
	render() {
		if(__BROWSER__) {
			if(/Mobile|Android|iPad|iPhone|iPod/i.test(navigator.userAgent)) {
				return false
			}
		}

		return (
			<Button onClick={this.onClick.bind(this)} style={{...styles.send, ...this.props.style}} src="/images/messenger-icon-white.png">
				{this.props.children || 'Messenger'}
			</Button>
		)
	}
}

FacebookSendButton.contextTypes = {
	url:React.PropTypes.string
}

module.exports = FacebookSendButton