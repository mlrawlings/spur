var React = require('react')
  , Color = require('color')
  , Image = require('./common/image')
  , View = require('./common/view')
  , Text = require('./common/text')
  , categories = require('../data/categories')

var styles = {}

styles.section = {
	flexDirection:'row',
	alignItems:'center'
}

styles.categoryText = {
	color:'#fff',
	fontWeight:600,
	fontSize:14,
	textTransform:'uppercase'
}

styles.detail = {
	flexDirection:'row',
	alignItems:'center',
}

styles.icon = {
	height:14,
	marginRight:5
}

styles.detailText = {
	color:'#fff',
	fontSize:10,
	textTransform:'uppercase'
}

styles.vertical = {}

styles.vertical.section = {
	...styles.section,
	width:300,
	flex:0.5,
	justifyContent:'space-around'
}

styles.vertical.banner = () => ({})

styles.vertical.category = (backgroundColor) => ({
	...styles.vertical.section, 
	backgroundColor
})

styles.vertical.details = (backgroundColor) => ({
	...styles.vertical.section, 
	backgroundColor:Color(backgroundColor).darken(0.2).rgbString()
})

styles.horizontal = {}


styles.horizontal.banner = (backgroundColor) => ({
	flexDirection:'row', 
	backgroundColor
})

styles.horizontal.category = () => ({
	...styles.section, 
	justifyContent:'flex-start',
	flex:1
})

styles.horizontal.details = () => ({
	...styles.section, 
	width:280,
	justifyContent:'space-between'
})

class EventBanner extends React.Component {
	render() {
		var event = this.props.event
		  , category = categories[event.category || 'other']
		  , direction = this.props.horizontal ? 'horizontal' : 'vertical'
		  , color = category.color

		return (
			<View style={styles[direction].banner(color)}>
				<View style={styles[direction].category(color)}>
					<Text style={styles.categoryText}>{category.name}</Text>
				</View>
				<View style={styles[direction].details(color)}>
					<View style={styles.detail}>
						<Image style={styles.icon} src="/images/person-white.png" />
						<Text style={styles.detailText}>1 going</Text>
					</View>
					<View style={styles.detail}>
						<Image style={styles.icon} src="/images/clock-white.png" />
						<Text style={styles.detailText}>1h 20m</Text>
					</View>
					<View style={styles.detail}>
						<Image style={styles.icon} src="/images/white-pin.png" />
						<Text style={styles.detailText}>6.1 miles</Text>
					</View>
				</View>
			</View>
		)
	}
}

module.exports = EventBanner