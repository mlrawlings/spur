var React = require('react')
  , Button = require('../core/button')

var styles = {}

styles.share = {
	backgroundColor:'#56ac21'
}

class TextMessageButton extends React.Component {
	render() {
		var { url } = this.context
		  , href = false

		if(__BROWSER__) {
			if(/iPad|iPhone|iPod/i.test(navigator.userAgent)) {
				href = 'sms:&body='+encodeURIComponent(url)
			} else if(/Mobile/i.test(navigator.userAgent)) {
				href = 'sms:?body='+encodeURIComponent(url)
			}
		}

		return href && (
			<Button href={href} style={{...styles.share, ...this.props.style}} src="/images/sms-icon-white.png">
				{this.props.children || 'Text Msg'}
			</Button>
		)
	}
}

TextMessageButton.contextTypes = {
	url:React.PropTypes.string
}

module.exports = TextMessageButton