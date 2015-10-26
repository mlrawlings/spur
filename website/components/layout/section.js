var React = require('react')
  , View = require('../core/view')

var styles = {}

styles.container = {
	paddingTop:30,
	paddingBottom:30
}

styles.sizer = {
	width:'100%',
	flexGrow:1,
	maxWidth:800,
	paddingLeft:5,
	paddingRight:5,
	margin:'auto'
}

styles.wrapper = {
	paddingLeft:'3%',
	paddingRight:'3%',
	flexGrow:1,
	maxWidth:'100%'
}

class Section extends React.Component {
	render() {
		var { style, children, ...props } = this.props
		  , { flexDirection, flexWrap, flexFlow, justifyContent, alignItems, alignContent, ...containerStyles} = style || {}
		  , wrapperStyles = { flexDirection, flexWrap, flexFlow, justifyContent, alignItems, alignContent }

		Object.keys(wrapperStyles).forEach(function(style) {
			if(wrapperStyles[style] === undefined) delete wrapperStyles[style]
		})

		return (
			<View style={{ ...styles.container, ...containerStyles }} {...props}>
				<View style={styles.sizer}>
					<View style={{ ...styles.wrapper, ...wrapperStyles }}>
						{children}
					</View>
				</View>
			</View>
		)
	}
}

module.exports = Section