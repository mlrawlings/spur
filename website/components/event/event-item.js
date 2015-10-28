var React = require('react')
  , Color = require('color')
  , EventBanner = require('./event-banner')
  , Link = require('../core/link')
  , View = require('../core/view')
  , Text = require('../core/text')
  , Time = require('../format/time')
  , categories = require('../../data/categories')

var styles = {}

styles.verticalItem = {
	textDecoration:'none',
	width:'100%',
	marginTop:8,
	marginBottom:8,
	borderWidth:1,
	borderColor:'#ddd'
}

styles.horizontalItem = {
	...styles.verticalItem,
	flexDirection:'row',
}

styles.summary = {
	backgroundColor:'#fff',
	flex:1.5,
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

styles.cancelled = {
	...styles.details,
	color:'#b00',
	fontWeight:600,
	textTransform:'uppercase'
}

styles.banner = {
	flex:1,
	minHeight:60
}

class EventItem extends React.Component {
	renderSummary() {
		var { event } = this.props
		  , nameStyles = {...styles.name }

		if(event.cancelled) {
			nameStyles.textDecoration = 'line-through'
		}

		return (
			<View style={styles.summary}>
				<Text style={nameStyles}>
					{event.name}
				</Text>
				{event.cancelled ? (
					<Text style={styles.cancelled}>
						Cancelled
					</Text>
				) : (
					<Text style={styles.details}>
						<Text>@ </Text>
						<Time time={event.time} />
						<Text> - </Text>
						<Text>{(event.location.name || event.location.street)}</Text>
					</Text>
				)}
			</View>
		)
	}
	render() {
		var { event, location } = this.props

		return (
			<View>
				<View style={styles.verticalItem} href={"/event/"+event.id} query='(max-width:500px)'>
					{this.renderSummary()}
					<EventBanner style={styles.banner} event={event} location={location} />
				</View>
				<View style={styles.horizontalItem} href={"/event/"+event.id} query='(min-width:501px)'>
					{this.renderSummary()}
					<EventBanner style={styles.banner} event={event} location={location} />
				</View>
			</View>
		)
	}
}

module.exports = EventItem