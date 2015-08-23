var React = require('react')
  , View = require('../common/view')
  , Text = require('../common/text')

var categories = {
	volunteer: {
		name:'Volunteer & Service',
		color:'#ff5e97'
	},
	sports: {
		name:'Sports & Fitness',
		color:'#ff8f26'
	},
	food: {
		name:'Food & Leisure',
		color:'#ffd727'
	},
	outdoors: {
		name:'Nature & Outdoors',
		color:'#0DBD6F'
	},
	games: {
		name:'Games & Hobbies',
		color:'#0599cd'
	},
	travel: {
		name:'Travel & Tourism',
		color:'#9035B0'
	},
	music: {
		name:'Music & Entertainment',
		color:'#3c4f62'
	},
	other: {
		name:'Other',
		color:'#909999'
	}
}

var styles = {}

styles.container = {
	flexDirection:'row',
	flexWrap:'wrap'
}

styles.block = {
	width:'25%',
	height:80,
	padding:15,
	cursor:'pointer',
	justifyContent:'flex-end'
}

styles.input = {
	display:'none'
}

styles.label = {
	color:'#ffffff'
}

styles.selected = {
	position:'absolute',
	top:0,
	left:0,
	right:0,
	bottom:0,
	backgroundColor:'rgba(0,0,0,0.1)'
}

class CategoryInput extends React.Component {
	constructor(props) {
		super(props)
		this.state = { value:props.value }
	}
	selectCategory(value) {
		this.setState({ value })
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
							{selected && <View style={styles.selected}></View>}
						</View>
					)
				})}
				<input {...this.props} type="hidden" value={this.state.value} />
			</View>
		)
	}
}

module.exports = CategoryInput