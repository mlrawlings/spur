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
		this.state = { opener:false }
	}
	performAction(user) {
		if(!user) {
			return this.setState({ opener:this.refs.button })
		}

		var fn = typeof this.props.action == 'function'
			? this.props.action
			: (done) => app.navigate(this.props.action).then(done)

		if(fn.length) {
			this.setState({ loading:true })
			fn(() => {
				this.setState({ loading:false, opener:false })
				this.props.onRequestClose && this.props.onRequestClose()
			})
		} else {
			fn()
			this.setState({ opener:false })
		}
	}
	closeModal() {
		this.setState({ opener:false })
	}
	render() {
		var { user, action, style, actionName, type, children, ...buttonProps } = this.props
		  , Type = this.props.type || Button
		  , { order, flex, flexGrow, flexShrink, flexBasis, alignSelf, ...buttonStyles } = style
		  , wrapperStyles = { order, flex, flexGrow, flexShrink, flexBasis, alignSelf }

		buttonStyles.flexGrow = 1

		Object.keys(wrapperStyles).forEach(function(style) {
			if(wrapperStyles[style] === undefined) delete wrapperStyles[style]
		})

		return (
			<View style={wrapperStyles}>
				<Type ref="button" {...buttonProps} loading={this.state.loading} style={style} onClick={this.performAction.bind(this, user)}>
					{children || actionName}
				</Type>
				<SignUpModal openedBy={this.state.opener} onRequestClose={this.closeModal.bind(this)}
					actionName={actionName}
					actionColor={(style && style.backgroundColor) || 'rgb(4, 190, 202)'}
					onLogin={this.performAction.bind(this)} />
			</View>
		)
	}
}

module.exports = UserActionButton