const ENTER = 13

var React = require('react')
  , View = require('../core/view')
  , Text = require('../core/text')
  , Form = require('../core/form')
  , Button = require('../core/button')
  , Link = require('../core/link')
  , Modal = require('../core/modal')
  , Label = require('../layout/label')
  , Input = require('../core/input')
  , FlatButton = require('../core/flat-button')
  , FacebookLoginButton = require('../button/facebook-login-button')
  , api = require('../../../api/client')

var styles = {}

styles.nameContainer = {
	flex: 1,
	flexDirection: 'row',
	paddingBottom: 30,
	borderBottom: '1px solid #ccc'
}

styles.name = {
	flex: 1,
	paddingTop: 10
}

styles.action = {
	color: '#fff',
	width: 'auto',
	padding: '0 10px',
	cursor: 'pointer',
	height: 'auto'
}

styles.actionText = {
	color: '#fff',
}

styles.loginOrSignUpTextContainer = {
	alignItems: 'center'
}

styles.loginOrSignUpText = {
	backgroundColor: '#fff',
	marginTop: -10,
	fontSize: 12,
	color: '#999',
	padding: '0px 10px'
}

styles.facebookButtonContainer = {
	marginTop: 20,
	alignItems: 'center',
	justifyContent: 'center'
}

class SignUpModal extends React.Component {
	constructor(props) {
		super(props)
		this.state = { 
			disabled:true,
			name:''
		}
	}
	onInputChange(e) {
		this.setState({ name:e.target.value })

		if(e.target.value) this.setState({ disabled:false })
		else this.setState({ disabled:true })
	}
	submitIfEnter(e) {
		if(e.which == ENTER) this.submit()
	}
	submit() {
		this.setState({ loading:true })
		api.post('/auth/guest').send({ name:React.findDOMNode(this.refs.name).value }).then((res) => {
			window.user = res.user
			this.setState({ loading:false })
			this.props.onLogin && this.props.onLogin(window.user)
		})
	}
	render() {
		var { action, actionName, actionColor, ...props} = this.props

		styles.action = { ...styles.action, backgroundColor:actionColor }

		return (
			<Modal {...props}>
				<Modal.Body>
					<Label required={true}>My first name is...</Label>
					<View style={styles.nameContainer}>
						<Input ref="name" name="name" onKeyDown={this.submitIfEnter.bind(this)} onChange={this.onInputChange.bind(this)} style={styles.name} type="text" value={this.state.value} />
						<FlatButton onClick={this.submit.bind(this)} loading={this.state.loading} type="submit" disabled={this.state.disabled} style={styles.action}>
							<Text style={styles.actionText}>{actionName}</Text>
						</FlatButton>
					</View>
					<View style={styles.loginOrSignUpTextContainer}>
						<View style={styles.loginOrSignUpText}>or login/sign up with</View>
					</View>
					<View style={styles.facebookButtonContainer}>
						<FacebookLoginButton onLogin={this.props.onLogin} />
					</View>
				</Modal.Body>
			</Modal>
		)
	}
}

module.exports = SignUpModal