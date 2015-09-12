var React = require('react')
  , Button = require('../core/button')

var styles = {}

styles.send = {
	backgroundColor:'rgb(0,132,255)'
}

class FacebookSendButton extends React.Component {
	render() {
		return (
			<Button style={{...styles.send, ...this.props.style}} src="/images/messenger-icon-white.png">
				{this.props.children || 'Send'}
			</Button>
		)
	}
}

module.exports = FacebookSendButton