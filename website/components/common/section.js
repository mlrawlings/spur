var React = require('react')
  , View = require('./view')

var styles = {}

styles.container = {
	paddingTop:30,
	paddingBottom:30
}

styles.wrapper = {
	width:'100%',
	maxWidth:800,
	paddingLeft:30,
	paddingRight:30,
	margin:'auto'
}

class Section extends React.Component {
	render() {
		var { flexDirection, flexWrap, flexFlow, justifyContent, alignItems, alignContent, ...containerStyles} = this.props.style || {}
		  , wrapperStyles = { flexDirection, flexWrap, flexFlow, justifyContent, alignItems, alignContent }

		return (
			<View style={{ ...styles.container, ...containerStyles }}>
				<View style={{ ...styles.wrapper, ...wrapperStyles }}>
					{this.props.children}
				</View>
			</View>
		)
	}
}

module.exports = Section