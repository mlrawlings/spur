var Text = require('./text')
  , Section = require('../layout/section')

var styles = {}

styles.headerExpanded = {
	backgroundColor:'#fff',
	paddingTop:10,
	paddingBottom:10,
	alignItems:'center',
	justifyContent:'space-between',
	borderBottomWidth:1,
	borderBottomColor:'#ddd',
	flexDirection:'row'
}

styles.title = {
	fontSize:20,
	fontWeight:300
}

styles.headerBack = {
	fontSize:23,
	marginTop:-6
}

styles.headerClose = {
	fontSize:20
}

var FullScreenHeader = (props) => {
	var { children, ...sectionProps } = props
	return (
		<Section {...sectionProps} style={styles.headerExpanded}>
			<Text style={styles.headerBack}>&lsaquo;</Text>
			<Text style={styles.title}>{children}</Text>
			<Text style={styles.headerClose}>&times;</Text>
		</Section>
	)
}

module.exports = FullScreenHeader