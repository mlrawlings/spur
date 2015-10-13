var React = require('react')
  , Color = require('color')
  , Image = require('../core/image')
  , View = require('../core/view')
  , Text = require('../core/text')
  , categories = require('../../data/categories')

var styles = {}

styles.container = {
	flexDirection:'row',
	flexWrap:'wrap',
	width: '100%',
	borderWidth:1,
	borderStyle:'solid',
	borderColor:'#ccc'
}

styles.block = {
	minWidth:140,
	flexBasis:140,
	flexGrow:1,
	height:80,
	padding:15,
	cursor:'pointer',
	justifyContent:'center',
	alignItems:'center'
}

styles.hiddenInput = {
	position:'absolute',
	bottom:0,
	left:0,
	zIndex:-1,
	opacity:0
}

styles.label = {
	color:'#ffffff',
	textTransform:'uppercase',
	fontWeight:600,
	fontSize:14,
	textAlign:'center',
	width:'100%'
}

styles.selected = {
	position:'absolute',
	top:0,
	left:0,
	right:0,
	bottom:0,
	justifyContent:'center',
	alignItems:'center'
}

styles.check = {
	height:30
}

class CategoryInput extends React.Component {
	constructor(props) {
		super(props)
		this.state = { value:props.defaultValue }
	}
	selectCategory(value) {
		this.setState({ value })
	}
	renderSelection(category) {
		var backgroundColor = Color(category.color).alpha(0.6).rgbString()

		return (
			<View style={{ ...styles.selected, backgroundColor }}>
				<Image style={styles.check} src="/images/check.png" />
			</View>
		)
	}
	render() {
		return (
			<View style={styles.container}>
				{Object.keys(categories).map((key) => {
					var category = categories[key]
					  , selected = this.state.value == key
					
					return (
						<View key={key} style={{ ...styles.block, backgroundColor:category.color }} onClick={this.selectCategory.bind(this, key)}>
							<Text style={styles.label}>{category.name}</Text>
							{selected && this.renderSelection(category)}
						</View>
					)
				})}
				<select {...this.props} style={styles.hiddenInput} value={this.state.value}>
					<option></option>
					{Object.keys(categories).map((key) => {
						var category = categories[key]
						return (
							<option key={key} value={key}>{category.name}</option>
						)
					})}
				</select>
			</View>
		)
	}
}

module.exports = CategoryInput