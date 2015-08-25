var React = require('react')
  , Color = require('color')
  , EventBanner = require('./event-banner')
  , Link = require('./common/link')
  , View = require('./common/view')
  , Text = require('./common/text')
  , timeUtil = require('../util/time')
  , categories = require('../data/categories')

var styles = {}

styles.item = {
	flexDirection:'row',
	textDecoration:'none',
	width:'100%',
	marginTop:8,
	marginBottom:8
}

styles.summary = {
	backgroundColor:'#fff',
	flex:1,
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

class EventItem extends React.Component {
	render() {
		var event = this.props.event
		  , category = categories[event.category || 'other']
		
		return (
			<Link style={styles.item} href={"/event/"+event.id}>
				<View style={styles.summary}>
					<Text style={styles.name}>
						{event.name}
					</Text>
					<Text style={styles.details}>
						{'@ ' + timeUtil.format(event.time) + ' - ' + event.location.name}
					</Text>
				</View>
				<EventBanner event={event} />
			</Link>
		)
	}
}

module.exports = EventItem