var React = require('react')
  , Button = require('../core/button')
  , View = require('../core/view')
  , ShareModal = require('../modal/share-modal')

var styles = {}

class ShareButton extends React.Component {
	constructor(props) {
		super(props)
		this.state = { modalIsOpen:false }
	}
	openModal() {
		this.setState({ modalIsOpen:true })
	}
	closeModal() {
		this.setState({ modalIsOpen:false })
	}
	render() {
		var { children, type, ...props } = this.props
		  , { modalIsOpen } = this.state
		  , content = children ? children : 'Share'
		  , Type = type || Button
		return (
			<View>
				<Type {...props} onClick={this.openModal.bind(this)}>
					{content}
				</Type>
				<ShareModal isOpen={modalIsOpen} onRequestClose={this.closeModal.bind(this)} />
			</View>
		)
	}
}

module.exports = ShareButton