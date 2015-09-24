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
	paddingTop:5,
	paddingBottom:5
}

styles.summary = {
	flexDirection:'row',
	flexWrap:'wrap',
	justifyContent:'space-between',
	alignItems:'center',
	backgroundColor:'#fff',
	borderBottomWidth:1,
	borderBottomColor:'#ddd',
	paddingTop:15,
	paddingBottom:15
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

styles.nameAndTime = {
	flex:1,
	minWidth:300,
	paddingTop:10,
	paddingBottom:10
}

styles.location = {
	alignItems:'flex-end',
	textAlign: 'right',
	flexGrow:0.01,
	marginLeft:20,
	paddingTop:10,
	paddingBottom:10
}

styles.locationName = {
	fontWeight:600
}

styles.address = {
	fontSize:14
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

styles.content = {
	paddingTop:20,
	paddingBottom:20
}

styles.attendees = {
	marginTop:30,
	maxWidth:600
}

styles.posts = {
	marginTop:30,
	maxWidth:600
}

styles.mapCover = {
	zIndex: 1,
	width: '100%',
	height: '100%',
	position: 'absolute',
	justifyContent: 'center',
	alignItems: 'center',
	background: 'rgba(0, 0, 0, 0.55)'
}

styles.cancelledText = {
	color: 'white',
	fontSize: 40,
	fontWeight: 300
}

class EventPage extends React.Component {
	render() {
		var event = this.props.event
		  , user = this.props.user
		  , category = categories[event.category || 'other']
		  , bannerStyles = { ...styles.banner, backgroundColor:category.color }
		  , titleStyles = { ...styles.title }

		return (
			<Layout user={this.props.user}>
				
				<GoogleMap center={event.location.coords} zoom={17}>
					{event.cancelled && <View style={styles.mapCover}>
						<Text style={styles.cancelledText}>CANCELLED</Text>
					</View>}
					<GoogleMapMarker position={event.location.coords} />
				</GoogleMap>

				<Section style={bannerStyles}>
					<EventBanner horizontal={true} event={event} location={this.props.location} />
				</Section>


				<Section style={styles.summary}>
					<View style={styles.nameAndTime}>
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
					<AttendAndInvite event={event} user={user} />
					<Attendees style={styles.attendees} event={event} />
					<Posts style={styles.posts} event={event} user={this.props.user} />
				</Section>
			</Layout>
		)
	}
}

module.exports = EventPage