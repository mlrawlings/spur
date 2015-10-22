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
		this.setFunction(props.action) 
	}
	componentWillReceiveProps(nextProps) {
		this.setFunction(nextProps.action)
	}
	trigger(fn) {
		this.fn = fn
		this.performAction(this.props.user)
	}
	setFunction(action) {
		this.fn = typeof action == 'function' ? action : (done) => app.navigate(action).then(done)
	}
	performAction(user) {
		if(!user) {
			return this.setState({ opener:this.refs.button })
		}

		if(this.fn.length) {
			this.setState({ loading:true })
			this.fn(() => {
				this.setState({ loading:false, opener:false })
				this.props.onRequestClose && this.props.onRequestClose()
			})
		} else {
			this.fn()
			this.setState({ opener:false })
		}
	}
	closeModal() {
		this.setState({ opener:false })
	}
	render() {
		var { user, action, style, actionName, tag, children, ...buttonProps } = this.props
		  , Type = this.props.tag || Button
		  , { order, flex, flexGrow, flexShrink, flexBasis, alignSelf, ...buttonStyles } = style || {}
		  , wrapperStyles = { order, flex, flexGrow, flexShrink, flexBasis, alignSelf }

		buttonStyles.flexGrow = 1

		Object.keys(wrapperStyles).forEach(function(style) {
			if(wrapperStyles[style] === undefined) delete wrapperStyles[style]
		})

		return (
			<View style={wrapperStyles}>
				<Type ref="button" {...buttonProps} loading={this.state.loading} style={style} onClick={action && this.performAction.bind(this, user)}>
					{children || actionName}
				</Type>
				<SignUpModal openedBy={this.state.opener} onRequestClose={this.closeModal.bind(this)}
					actionName={actionName}
					actionColor={'rgb(4, 190, 202)'}
					onLogin={this.performAction.bind(this)} />
			</View>
		)
	}
}

module.exports = UserActionButton