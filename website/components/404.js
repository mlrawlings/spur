var React = require('react')
  , Layout = require('./layout')
  , Section = require('./layout/section')
  , View = require('./core/view')

var styles = {}

styles.error = {
	textAlign: 'center',
	fontSize: 40
}

class Four0Four extends React.Component {
	render() {
		return (
			<Layout user={this.props.user}>
				<Section>
					<View style={styles.error}>404 Page Does Not Exist</View>
				</Section>
			</Layout>
		)
	}
}

module.exports = Four0Four