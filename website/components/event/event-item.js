var React = require('react')
  , Color = require('color')
  , EventBanner = require('./event-banner')
  , Link = require('../core/link')
  , View = require('../core/view')
  , Text = require('../core/text')
  , timeUtil = require('../../util/time')
  , categories = require('../../data/categories')

var styles = {}

styles.item = {
	flexDirection:'row',
	textDecoration:'none',
	width:'100%',
	marginTop:8,
	marginBottom:8,
	borderWidth:1,
	borderColor:'#ddd',
	flexWrap:'wrap'
}

styles.summary = {
	backgroundColor:'#fff',
	flex:1.5,
	minWidth:'60%',
	maxWidth:'100%',
	padding:15
}

styles.name = {
	fontSize: 28,
	fontWeight: 300
}

styles.details = {
	fontSize: 14,
	color: '#888'
}

styles.banner = {
	minWidth:200,
	width:'50%',
	flex:1,
	minHeight:60
}

class EventItem extends React.Component {
	render() {
		var { event, location } = this.props
		  , category = categories[event.category || 'other']
		  , itemStyles = {...styles.item }
		  , nameStyles = {...styles.name }

		if(event.cancelled) {
			itemStyles.opacity = 0.5
			nameStyles.textDecoration = 'line-through'
		}

		return (
			<Link style={itemStyles} href={"/event/"+event.id}>
				<View style={styles.summary}>
					<Text style={nameStyles}>
						{event.name}
					</Text>
					<Text style={styles.details}>
						{'@ ' + timeUtil.format(event.time) + ' - ' + (event.location.name || event.location.street)}
					</Text>
				</View>
				<EventBanner style={styles.banner} event={event} location={location} />
			</Link>
		)
	}
}

module.exports = EventItem