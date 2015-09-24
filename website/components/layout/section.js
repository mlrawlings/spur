var React = require('react')
  , View = require('../core/view')

var styles = {}

styles.container = {
	paddingTop:30,
	paddingBottom:30
}

styles.sizer = {
	width:'100%',
	maxWidth:800,
	paddingLeft:5,
	paddingRight:5,
	margin:'auto'
}

styles.wrapper = {
	paddingLeft:'3%',
	paddingRight:'3%'
}

class Section extends React.Component {
	render() {
		var { flexDirection, flexWrap, flexFlow, justifyContent, alignItems, alignContent, ...containerStyles} = this.props.style || {}
		  , wrapperStyles = { flexDirection, flexWrap, flexFlow, justifyContent, alignItems, alignContent }

		Object.keys(wrapperStyles).forEach(function(style) {
			if(wrapperStyles[style] === undefined) delete wrapperStyles[style]
		})

		return (
			<View style={{ ...styles.container, ...containerStyles }}>
				<View style={styles.sizer}>
					<View style={{ ...styles.wrapper, ...wrapperStyles }}>
						{this.props.children}
					</View>
				</View>
			</View>
		)
	}
}

module.exports = Section