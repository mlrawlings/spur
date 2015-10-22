var React = require('react')
  , Button = require('../core/button')
  , View = require('../core/view')
  , api = require('../../../api/client')

var styles = {}

styles.logoutButton = {
	backgroundColor: '#999',
	marginTop: 10
}

class ShareButton extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	logout() {
		console.log('logout')
		api.delete('/auth').then(res => {
			console.log('test')
			window.user = undefined
			app.refresh()
		})
	}
	render() {
		return (
			<View>
				<Button style={styles.logoutButton} onClick={this.logout.bind(this)}>
					{this.props.children}
				</Button>
			</View>
		)
	}
}

module.exports = ShareButton