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
  , scroll = __BROWSER__ && require('scroll')

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

styles.endTime = {
	fontSize: 9,
	color: '#888',
	textTransform:'lowercase'
}

styles.nameAndTime = {
	flexGrow:100,
	minWidth:300,
	maxWidth: '100%',
	paddingTop:10,
	paddingBottom:10
}

styles.location = {
	alignItems:'flex-end',
	textAlign: 'right',
	flexGrow:1,
	marginLeft:20,
	paddingTop:10,
	paddingBottom:10
}

styles.locationName = {
	fontWeight:600
}

styles.address = {
	fontSize:14,
	textDecoration: 'underline',
	color: '#04A5B4'
}

styles.details = {
	backgroundColor: '#f4f4f4',
	borderBottomWidth: 1,
	borderBottomColor: '#ddd',
	flexDirection:'row',
	paddingTop:20,
	paddingBottom:20
}

styles.detailsText = {
	flexGrow: 1,
	maxWidth: '100%'
}

styles.content = {
	paddingTop:20,
	paddingBottom:20
}

styles.attendees = {
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
	onEventBannerClick() {
		var distance = React.findDOMNode(this.refs.eventBanner).getBoundingClientRect().top
		scroll.top(document.body, window.scrollY+distance, { duration:Math.abs(distance) })
	}
	render() {
		var event = this.props.event
		  , user = this.props.user
		  , category = categories[event.category || 'other']
		  , bannerStyles = { ...styles.banner, backgroundColor:category.color }
		  , titleStyles = { ...styles.title }
		  , isOwner = user && user.id == event.owner
		  , startTimeClass = timeUtil.getTimeClass(event.time)
		  , endTimeClass = event.endTime && timeUtil.getTimeClass(event.endTime)
		  , sameTimeClassEndTime = event.endTime && (startTimeClass == endTimeClass ? (' - '+timeUtil.format(event.endTime)) : '') || ''
		  , diffTimeClassEndTime = event.endTime && (startTimeClass == endTimeClass ? '' : (timeUtil.format(event.endTime) + ' ' + endTimeClass)) || ''

		
		return (
			<Layout user={this.props.user}>
				
				<GoogleMap center={event.location.coords} zoom={17}>
					{event.cancelled && <View style={styles.mapCover}>
						<Text style={styles.cancelledText}>CANCELLED</Text>
					</View>}
					<GoogleMapMarker position={event.location.coords} />
				</GoogleMap>

				<Section style={bannerStyles}>
					<EventBanner ref="eventBanner" onClick={this.onEventBannerClick.bind(this)} horizontal={true} event={event} location={this.props.location} />
				</Section>

				<Section style={styles.summary}>
					<View style={styles.nameAndTime}>
						<Text style={titleStyles}>
							{event.name}
						</Text>
						<Text>{event.invited}</Text>
						<Text style={styles.time}>
							{timeUtil.format(event.time) + sameTimeClassEndTime + ' ' + timeUtil.getTimeClass(event.time)}
						</Text>
						{diffTimeClassEndTime && <Text style={styles.endTime}>
							{'until '+diffTimeClassEndTime}
						</Text>}
					</View>
					<View style={styles.location}>
						<Link href={"http://maps.google.com?daddr="+event.location.coords[0]+','+event.location.coords[1]}>
							<Text style={styles.locationName}>{event.location.name}</Text>
							<Text style={styles.address}>{event.location.street}</Text>
							<Text style={styles.address}>{event.location.citystatezip}</Text>
						</Link>
					</View>
				</Section>
				
				{event.details && <Section style={styles.details}>
					<View style={styles.detailsText}>
						<Heading>Details</Heading>
						<Text>{event.details}</Text>
					</View>
				</Section>}

				<Section style={styles.content}>
					<AttendAndInvite event={event} user={user} currentURL={this.props.currentURL} />
					<Attendees style={styles.attendees} event={event} />
					<Posts style={styles.posts} event={event} user={this.props.user} />
				</Section>
			</Layout>
		)
	}
}

module.exports = EventPage