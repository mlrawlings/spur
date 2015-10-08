var React = require('react')
  , Color = require('color')
  , TimeUntil = require('../format/time-until')
  , Image = require('../core/image')
  , View = require('../core/view')
  , Text = require('../core/text')
  , timeUtil = require('../../util/time')
  , locationUtil = require('../../util/location')
  , categories = require('../../data/categories')

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
	width:'100%',
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
	flexWrap:'wrap',
	backgroundColor
})

styles.horizontal.category = () => ({
	...styles.section, 
	justifyContent:'flex-start',
	flexGrow:2,
	minWidth:200,
	paddingTop:5,
	paddingBottom:5,
})

styles.horizontal.details = () => ({
	...styles.section, 
	minWidth:230,
	flexGrow:1,
	paddingTop:5,
	paddingBottom:5,
	justifyContent:'space-between'
})

class EventBanner extends React.Component {
	render() {
		var event = this.props.event
		  , style = this.props.style
		  , category = categories[event.category || 'other']
		  , location = this.props.location
		  , direction = this.props.horizontal ? 'horizontal' : 'vertical'
		  , color = category.color

		return (
			<View onClick={this.props.onClick} style={{ ...styles[direction].banner(color), ...style }}>
				<View style={styles[direction].category(color)}>
					<Text style={styles.categoryText}>{category.name}</Text>
				</View>
				<View style={styles[direction].details(color)}>
					<View style={styles.detail}>
						<Image style={styles.icon} src="/images/person-white.png" />
						<Text style={styles.detailText}>{event.attendees.length + ' going'}</Text>
					</View>
					<View style={styles.detail}>
						<Image style={styles.icon} src="/images/clock-white.png" />
						<TimeUntil style={styles.detailText} time={event.time} />
					</View>
					{location && <View style={styles.detail}>
						<Image style={styles.icon} src="/images/white-pin.png" />
						<Text style={styles.detailText}>
							{locationUtil.getDistanceBetween(event.location.coords, location.coords)}
						</Text>
					</View>}
				</View>
			</View>
		)
	}
}

module.exports = EventBanner