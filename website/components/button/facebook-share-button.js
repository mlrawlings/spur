var React = require('react')
  , Button = require('../core/button')

var styles = {}

styles.share = {
	backgroundColor:'#3a579d'
}

class FacebookShareButton extends React.Component {
	onClick(e) {
		FB.ui({
			method: 'share',
			href: this.props.currentURL
		})
		e.preventDefault()
	}
	render() {
		return (
			<Button onClick={this.onClick.bind(this)} style={{...styles.share, ...this.props.style}} src="/images/facebook-icon-white.png">
				{this.props.children || 'Facebook'}
			</Button>
		)
	}
}

module.exports = FacebookShareButton