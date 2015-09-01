var React = require('react')
  , EventBanner = require('./event-banner')
  , Layout = require('./layout')
  , Attendees = require('./attendees')
  , SpurMap = require('./common/spur-map')
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
}

styles.title = {
	fontSize: 28,
	fontWeight: 300
}

styles.time = {
	fontSize: 16,
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

styles.actions = {
	backgroundColor:'#fff',
	paddingTop:10,
	paddingBottom:10,
	alignItems:'center'
}

class EventPage extends React.Component {
	render() {
		var event = this.props.event
		  , category = categories[event.category || 'other']
		  , bannerStyles = { ...styles.banner, backgroundColor:category.color }
		  , attending = event.attendees.indexOf(this.props.fbid) != -1

		return (
			<Layout fbid={this.props.fbid}>
				
				<SpurMap coords={event.location.coords} />

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
						<View style={styles.details}>
							<Heading>Details</Heading>
							<Text style={styles.detailsText}>
								{event.description}
							</Text>
						</View>
						<View style={styles.discussion}>
							<Heading>Discussion</Heading>
							<Text style={styles.detailsText}>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
								Quisque urna lectus, sollicitudin eu tempor non, lacinia non felis. 
								Etiam faucibus ut justo sed bibendum. 
								Phasellus lorem nisl, consequat id blandit dignissim, volutpat a dui. 
								In pretium elementum sem id.
							</Text>
						</View>
					</View>
					<View style={styles.attendees}>
						{!attending && <Button href={'/event/'+event.id+'/join'}>
							+ Join
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