var React = require('react')
  , EventBanner = require('./event-banner')
  , Attendees = require('./attendees')
  , AttendAndInvite = require('./attend-and-invite')
  , Posts = require('./posts')
  , Layout = require('../layout')
  , Section = require('../layout/section')
  , Heading = require('../layout/heading')
  , GoogleMap = require('../map/google-map')
  , GoogleMapMarker = require('../map/google-map-marker')
  , View = require('../core/view')
  , Text = require('../core/text')
  , Link = require('../core/link')
  , timeUtil = require('../../util/time')
  , categories = require('../../data/categories')

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
	alignItems:'flex-end',
	textAlign: 'right'
}

styles.locationName = {
	fontWeight:600
}

styles.address = {
	fontSize:14
}

styles.content = {
	flexDirection:'row',
	paddingTop:20,
	paddingBottom:20
}

styles.leftColumn = {
	flex:1
}

styles.details = {
	backgroundColor: '#f4f4f4',
	borderBottomWidth: 1,
	borderBottomColor: '#ddd',
	flexDirection:'row',
	paddingTop:20,
	paddingBottom:20
}

styles.description = {
	flex: 1
}

styles.attendees = {
	width:100,
	marginLeft:30,
	alignItems:'flex-end'
}

styles.posts = {
	marginTop:30
}

class EventPage extends React.Component {
	render() {
		var event = this.props.event
		  , user = this.props.user
		  , category = categories[event.category || 'other']
		  , bannerStyles = { ...styles.banner, backgroundColor:category.color }
		  , titleStyles = { ...styles.title }

		if(event.cancelled)
			titleStyles.textDecoration = 'line-through'

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
						<Text style={titleStyles}>
							{event.name}
						</Text>
						<Text>{event.invited}</Text>
						<Text style={styles.time}>
							{'@ ' + timeUtil.format(event.time) + ' ' + timeUtil.getTimeClass(event.time)}
						</Text>
					</View>
					<View style={styles.location}>

						<Text style={styles.locationName}>{event.location.name}</Text>
						<Link href={"http://maps.google.com?daddr="+event.location.coords[0]+','+event.location.coords[1]}>
							<Text style={styles.address}>{event.location.street}</Text>
							<Text style={styles.address}>{event.location.citystatezip}</Text>
						</Link>
					</View>
				</Section>
				
				{event.description && <Section style={styles.details}>
					<View style={styles.description}>
						<Heading>Description</Heading>
						<Text>{event.description}</Text>
					</View>
				</Section>}

				<Section style={styles.content}>
					<View style={styles.leftColumn}>
						<AttendAndInvite event={event} user={user} />
						<Posts style={styles.posts} event={event} user={this.props.user} />
					</View>
					<Attendees style={styles.attendees} event={event} />
				</Section>
			</Layout>
		)
	}
}

module.exports = EventPage