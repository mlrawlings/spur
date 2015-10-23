var React = require('react')
  , Button = require('../core/button')
  , View = require('../core/view')
  , ShareModal = require('../modal/share-modal')

var styles = {}

class ShareButton extends React.Component {
	constructor(props) {
		super(props)
		this.state = { opener:null }
	}
	openModal() {
		this.setState({ opener:this.refs.button })
	}
	closeModal() {
		this.setState({ opener:null })
	}
	render() {
		var { children, style, tag, ...props } = this.props
		  , { opener } = this.state
		  , content = children ? children : 'Share'
		  , Tag = tag || Button
		  , { order, flex, flexGrow, flexShrink, flexBasis, alignSelf, ...buttonStyles } = style
		  , wrapperStyles = { order, flex, flexGrow, flexShrink, flexBasis, alignSelf }

		buttonStyles.flexGrow = 1

		Object.keys(wrapperStyles).forEach(function(style) {
			if(wrapperStyles[style] === undefined) delete wrapperStyles[style]
		})

		return (
			<View style={wrapperStyles}>
				<Tag ref="button" style={buttonStyles} {...props} onClick={this.openModal.bind(this)}>
					{content}
				</Tag>
				<ShareModal openedBy={opener} onRequestClose={this.closeModal.bind(this)} />
			</View>
		)
	}
}

module.exports = ShareButton