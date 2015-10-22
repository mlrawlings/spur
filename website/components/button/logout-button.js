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
			opener:false
		}
	}
	logout() {
		this.setState({ opener:false })
		console.log('logout')
		api.delete('/auth').then(res => {
			console.log('test')
			window.user = undefined
			app.refresh()
		})
	}
	openModal() {
		this.setState({ opener:this.refs.button })
	}
	closeModal() {
		this.setState({ opener:false })
	}
	render() {
		var logoutButtonStyles = { ...this.props.style, ...styles.logoutButton }

		return (
			<View>
				<Button ref="button" style={logoutButtonStyles} onClick={this.openModal.bind(this)}>
					{this.props.children}
				</Button>
				<ConfirmModal title="You will not be able to return to this guest account" openedBy={this.state.opener} onRequestClose={this.closeModal.bind(this)}
					onConfirm={this.logout.bind(this)} onCancel={this.closeModal.bind(this)} />
			</View>
		)
	}
}

module.exports = ShareButton