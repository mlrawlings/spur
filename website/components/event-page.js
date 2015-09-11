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
  , FacebookLoginButton = require('./layout/facebook-login-button')

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

styles.attendees = {
	width:100,
	marginLeft:30,
	alignItems:'flex-end'
}

styles.attendeesHeader = {
	flexDirection:'row',
	width: '100%',
	justifyContent:'flex-end',
	alignItems:'flex-end'
}

styles.details = {
	backgroundColor: '#f4f4f4',
	borderBottomWidth: 1,
	borderBottomColor: '#ddd',
	flexDirection:'row'
}

styles.attend = {
	justifyContent:'center',
	alignItems:'flex-end'
}

styles.attendingHeader = {
	textTransform:'none',
	color:'#444',
	marginBottom:5,
}

styles.attendingButtons = {
	flexDirection:'row'
}

styles.inviteButton = {
	marginLeft:5,
	backgroundColor:'rgb(0,132,255)',
	flexDirection:'row'
}

styles.inviteButtonImage = {
	width:20,
	height:20,
	marginRight:8
}

styles.inviteButtonText = {
	flex:1
}


styles.description = {
	flex: 1
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
					</View>
					<View style={styles.location}>
						<Text style={styles.locationName}>{event.location.name}</Text>
						<Text style={styles.address}>{event.location.street}</Text>
						<Text style={styles.address}>{event.location.citystatezip}</Text>
					</View>
				</Section>
				
				<Section style={styles.details}>
					<View style={styles.description}>
						<Heading>Description</Heading>
						<Text>
							Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
						</Text>
					</View>
					{()=>{
						if(!user) return <View style={styles.attend}>
							<Heading style={styles.attendingHeader}>Want to go?</Heading>
							<FacebookLoginButton>Login to Join or Post</FacebookLoginButton>
						</View>
						
						if(!attending) return <View style={styles.attend}>
							<Heading style={styles.attendingHeader}>Want to go?</Heading>
							<View style={styles.attendingButtons}>
								<Button href={'/event/'+event.id+'/join'}>
									+ Join
								</Button>
								<Button style={styles.inviteButton}>
									<Image style={styles.inviteButtonImage} src="/images/messenger-icon-white.png" />
									<Text style={styles.inviteButtonText}>Invite a Friend</Text>
								</Button>
							</View>
						</View>

						if(attending) return <View style={styles.attend}>
							<Heading style={styles.attendingHeader}>You are going!</Heading>
							<View style={styles.attendingButtons}>
								<Button style={styles.bail} href={'/event/'+event.id+'/bail'}>
									&times; Bail
								</Button>
								<Button style={styles.inviteButton}>
									<Image style={styles.inviteButtonImage} src="/images/messenger-icon-white.png" />
									<Text style={styles.inviteButtonText}>Invite a Friend</Text>
								</Button>
							</View>
						</View>
					}()}
				</Section>

				<Section style={styles.content}>
					<View style={styles.leftColumn}>
						<Heading>Discussion</Heading>
						<Posts event={event} user={this.props.user} />
					</View>

					<View style={styles.attendees}>
						<View style={styles.attendeesHeader}>
							<Heading style={styles.going}>{event.attendees.length + ' Going'}</Heading>
						</View>
						<Attendees event={event} />
					</View>
				</Section>
			</Layout>
		)
	}
}

module.exports = EventPage