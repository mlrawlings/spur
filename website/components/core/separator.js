var React = require('react')
  , View = require('./view')

var styles = {}

styles.container = {
	flexDirection:'row',
	width:'100%',
	alignItems:'center'
}

styles.line = {
	height:0,
	borderBottomWidth:1,
	borderBottomColor:'#ddd',
	flexGrow:1
}

styles.content = {
	color:'#888',
	padding:15,
	textTransform:'uppercase',
	fontSize:10
}

class Separator extends React.Component {
	render() {
		var { style, children, ...props } = this.props

		return (
			<View style={styles.container} {...props}>
				<View style={styles.line} />
				{children && <View style={styles.content}>{children}</View>}
				<View style={styles.line} />
			</View>
		)
	}
}

module.exports = Separator