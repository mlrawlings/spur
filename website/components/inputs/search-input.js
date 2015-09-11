var React = require('react')
  , Button = require('../common/button')
  , Image = require('../common/image')
  , View = require('../common/view')
  , categories = require('../../data/categories')

var styles = {}

styles.container = {
	flexDirection:'row',
	borderRadius:4,
	backgroundColor:'#fff'
}

styles.input = {
	border:0,
	padding:8,
	backgroundColor:'transparent',
	flex:1
}

styles.icon = {
	width:20,
	height:20
}

class SearchInput extends React.Component {
	constructor(props) {
		super(props)
		this.state = { value:props.defaultValue }
	}
	render() {
		var { style, ...props } = this.props
		return (
			<View style={{ ...styles.container, ...style }}>
				<input {...props} style={styles.input} type="text" placeholder="what do you want to do?" />
				<Button type="submit">
					<Image style={styles.icon} src="/images/search-white.png" />
				</Button>
			</View>
		)
	}
}

module.exports = SearchInput