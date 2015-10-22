var React = require('react')
  , View = require('../core/view')
  , Text = require('../core/text')
  , Form = require('../core/form')
  , Button = require('../core/button')
  , Link = require('../core/link')
  , Modal = require('../core/modal')
  , Label = require('../layout/label')
  , Input = require('../core/input')

var styles = {}

styles.buttons = {
	flexDirection: 'row',
	alignItems: 'flex-end',
	justifyContent: 'flex-end'
}

styles.cancel = {
	marginRight: 10,
	backgroundColor: '#999'
}

styles.confirm = {
	marginLeft: 10
}

class SignUpModal extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	render() {
		return (
			<Modal {...this.props}>
				<Modal.Header>
					<Modal.Title>{this.props.title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<View style={styles.buttons}>
						<Button style={styles.cancel} onClick={this.props.onCancel}>Cancel</Button>
						<Button style={styles.confirm} onClick={this.props.onConfirm}>Confirm</Button>
					</View>
				</Modal.Body>
			</Modal>
		)
	}
}

module.exports = SignUpModal