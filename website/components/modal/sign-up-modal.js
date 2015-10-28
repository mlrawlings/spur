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
  , Separator = require('../core/separator')
  , FacebookLoginButton = require('../button/facebook-login-button')
  , api = require('../../../api/client')

var styles = {}

styles.facebookButtonContainer = {
	marginTop: 10,
	alignItems: 'center',
	justifyContent: 'center'
}

styles.heading = {
	textAlign: 'center',
	color: '#444'
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
	alignItems: 'center',
	marginBottom: 10
}

styles.loginOrSignUpText = {
	backgroundColor: '#fff',
	marginTop: -10,
	fontSize: 12,
	color: '#444',
	padding: '0px 10px'
}

styles.guestAccountText = {
	backgroundColor: '#fff',
	marginTop: -10,
	fontSize: 12,
	color: '#777',
	padding: '0px 10px'
}

styles.nameContainer = {
	flex: 1,
	flexDirection: 'row'
}

styles.nameLabel = {
	fontSize: 12
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
					<View style={styles.heading}>
						<Label required={true}>Login or sign up with</Label>
					</View>
					<View style={styles.facebookButtonContainer}>
						<FacebookLoginButton onLogin={this.props.onLogin} />
					</View>
					<Separator>or make a guest account</Separator>
					<Label required={true}>My first name is...</Label>
					<View style={styles.nameContainer}>
						<Input ref="name" name="name" onKeyDown={this.submitIfEnter.bind(this)} onChange={this.onInputChange.bind(this)} style={styles.name} type="text" value={this.state.value} />
						<FlatButton onClick={this.submit.bind(this)} loading={this.state.loading} type="submit" disabled={this.state.disabled} style={styles.action}>
							<Text style={styles.actionText}>{actionName}</Text>
						</FlatButton>
					</View>
				</Modal.Body>
			</Modal>
		)
	}
}

module.exports = SignUpModal