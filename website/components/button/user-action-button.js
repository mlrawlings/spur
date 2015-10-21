var React = require('react')
  , Link = require('../core/link')
  , Image = require('../core/image')
  , View = require('../core/view')
  , Button = require('../core/button')
  , SignUpModal = require('../modal/sign-up-modal')

var styles = {}

class UserActionButton extends React.Component {
	constructor(props) {
		super(props)
		this.state = { modalIsOpen:false }
	}
	performAction(user) {
		if(!user) {
			return this.setState({ modalIsOpen:true })
		}

		var fn = typeof this.props.action == 'function'
			? this.props.action
			: (done) => app.navigate(this.props.action).then(done)

		if(fn.length) {
			this.setState({ loading:true })
			fn(() => {
				this.setState({ loading:false, modalIsOpen:false })
				this.props.onRequestClose && this.props.onRequestClose()
			})
		} else {
			fn()
			this.setState({ modalIsOpen:false })
		}
	}
	closeModal() {
		this.setState({ modalIsOpen:false })
	}
	render() {
		var { user, action, style, actionName, type, children, ...buttonProps } = this.props
		  , Type = this.props.type || Button

		return (
			<View>
				<View>
					<Type {...buttonProps} loading={this.state.loading} style={style} onClick={this.performAction.bind(this, user)}>
						{children || actionName}
					</Type>
					<SignUpModal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal.bind(this)}
						actionName={actionName}
						actionColor={(style && style.backgroundColor) || 'rgb(4, 190, 202)'}
						onLogin={this.performAction.bind(this)} />
				</View>
			</View>
		)
	}
}

module.exports = UserActionButton