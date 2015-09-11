var React = require('react')
  , EventBanner = require('./event-banner')
  , Layout = require('./layout')
  , Attendees = require('./attendees')
  , Posts = require('./posts')
  , GoogleMap = require('./common/google-map')
  , GoogleMapMarker = require('./common/google-map-marker')
  , Section = require('./common/section')
  , Heading = require('./common/heading')
  , Button = require('./common/button')
  , View = require('./common/view')
  , Text = require('./common/text')
  , Image = require('./common/image')
  , timeUtil = require('../util/time')
  , categories = require('../data/categories')

var styles = {}

styles.banner = {
	paddingTop:10,
	paddingBottom:10
}

styles.summary = {
	flexDirection:'row',
	justifyContent:'space-between',
	backgroundColor:'#fff',
	borderBottomWidth:1,
	borderBottomColor:'#ddd'
}

styles.title = {
	fontSize: 28,
	fontWeight: 300
}

styles.time = {
	fontSize: 14,
	color: '#888',
	textTransform:'lowercase'
}

styles.location = {
	alignItems:'flex-end'
}

styles.locationName = {
	fontWeight:600
}

styles.address = {
	fontSize:14
}

styles.content = {
	flexDirection:'row'
}

styles.leftColumn = {
	flex:1
}

styles.details = {
	paddingBottom:30
}

styles.detailsText = {
	flexWrap:'wrap'
}

styles.attendees = {
	width:150,
	marginLeft:30,
	alignItems:'flex-end'
}

styles.bail = {
	backgroundColor: '#c00'
}

styles.actions = {
	backgroundColor:'#fff',
	paddingTop:10,
	paddingBottom:10,
	alignItems:'center'
}

class EventPage extends React.Component {
	render() {
		var event = this.props.event
		  , user = this.props.user
		  , category = categories[event.category || 'other']
		  , bannerStyles = { ...styles.banner, backgroundColor:category.color }
		  , attending = !user || event.attendees.some(attendee => attendee.id == user.id)

		return (
			<Layout user={this.props.user}>
				
				<GoogleMap center={event.location.coords} zoom={17}>
					<GoogleMapMarker position={event.location.coords} />
				</GoogleMap>

				<Section style={bannerStyles}>
					<EventBanner horizontal={true} event={event} location={this.props.location} />
				</Section>


				<Section style={styles.summary}>
					<View>
						<Text style={styles.title}>
							{event.name}
						</Text>
						<Text style={styles.time}>
							{'@ ' + timeUtil.format(event.time) + ' ' + timeUtil.getTimeClass(event.time)}
						</Text>
						<View>
							
						</View>
					</View>
					<View style={styles.location}>
						<Text style={styles.locationName}>{event.location.name}</Text>
						<Text style={styles.address}>{event.location.street}</Text>
						<Text style={styles.address}>{event.location.citystatezip}</Text>
					</View>
				</Section>

				<Section style={styles.content}>
					<View style={styles.leftColumn}>
						<Posts event={event} user={this.props.user} />
					</View>
					<View style={styles.attendees}>
						{user && !attending && <Button href={'/event/'+event.id+'/join'}>
							+ Join
						</Button>}
						{user && attending && <Button style={styles.bail} href={'/event/'+event.id+'/bail'}>
							&times; Bail
						</Button>}
						<Heading>{event.attendees.length + ' Going'}</Heading>
						<Attendees event={event} />
					</View>
				</Section>
			</Layout>
		)
	}
}

module.exports = EventPage