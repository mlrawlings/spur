var React = require('react')
  , Button = require('../core/button')

var styles = {}

styles.share = {
	backgroundColor:'#56ac21'
}

class TextMessageButton extends React.Component {
	render() {
		var { currentURL } = this.props
		  , href = false

		if(__BROWSER__) {
			if(/iPad|iPhone|iPod/i.test(navigator.userAgent)) {
				href = 'sms:&body='+encodeURIComponent(currentURL)
			} else if(/Mobile/i.test(navigator.userAgent)) {
				href = 'sms:?body='+encodeURIComponent(currentURL)
			}
		}

		return href && (
			<Button href={href} style={{...styles.share, ...this.props.style}} src="/images/sms-icon-white.png">
				{this.props.children || 'Text Msg'}
			</Button>
		)
	}
}

module.exports = TextMessageButton