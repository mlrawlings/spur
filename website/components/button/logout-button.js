var React = require('react')
  , Button = require('../core/button')
  , View = require('../core/view')
  , api = require('../../../api/client')
  , ConfirmModal = require('../modal/confirm-modal')

var styles = {}

styles.logoutButton = {
	backgroundColor: '#999',
	marginTop: 5
}

class ShareButton extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			modalIsOpen:false
		}
	}
	logout() {
		this.setState({ modalIsOpen:false })
		console.log('logout')
		api.delete('/auth').then(res => {
			console.log('test')
			window.user = undefined
			app.refresh()
		})
	}
	openModal() {
		this.setState({ modalIsOpen:true })
	}
	closeModal() {
		this.setState({ modalIsOpen:false })
	}
	render() {
		var logoutButtonStyles = { ...this.props.style, ...styles.logoutButton }

		return (
			<View>
				<Button style={logoutButtonStyles} onClick={this.openModal.bind(this)}>
					{this.props.children}
				</Button>
				<ConfirmModal title="You will not be able to return to this guest account" isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal.bind(this)}
					onConfirm={this.logout.bind(this)} onCancel={this.closeModal.bind(this)} />
			</View>
		)
	}
}

module.exports = ShareButton