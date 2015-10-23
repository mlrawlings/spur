var React = require('react')
  , EventMap = require('./event-map')
  , EventChat = require('./event-chat')
  , EventSummary = require('./event-summary')
  , EventBanner = require('./event-banner')
  , Attendees = require('./attendees')
  , AttendAndInvite = require('./attend-and-invite')
  , Layout = require('../layout')
  , Section = require('../layout/section')
  , Heading = require('../layout/heading')
  , View = require('../core/view')
  , Text = require('../core/text')
  , Link = require('../core/link')
  , categories = require('../../data/categories')
  , scroll = __BROWSER__ && require('scroll')
  , ActionBar = require('./action-bar')

var styles = {}

styles.banner = {
	paddingTop:5,
	paddingBottom:5
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
	paddingBottom:20,
	backgroundColor:'#fff'
}

class EventPage extends React.Component {
	onEventBannerClick() {
		var distance = React.findDOMNode(this.refs.eventBanner).getBoundingClientRect().top
		scroll.top(document.body, window.scrollY+distance, { duration:Math.abs(distance) })
	}
	render() {
		var { event, user, location } = this.props
		  , category = categories[event.category || 'other']
		  , bannerStyles = { ...styles.banner, backgroundColor:category.color }
		  , isOwner = user && user.id == event.owner
		
		return (
			<Layout noFooter={true} user={this.props.user}>
				
				<EventMap event={event} />

				<Section style={bannerStyles}>
					<EventBanner horizontal={true} event={event} location={location} />
				</Section>
				
				{isOwner && <ActionBar event={event} />}

				<EventSummary event={event} location={location} />

				<Section style={styles.content}>
					<AttendAndInvite event={event} user={user} currentURL={this.props.currentURL} />
					<Attendees style={styles.attendees} event={event} />
				</Section>
				
				{event.details && <Section style={styles.details}>
					<View style={styles.detailsText}>
						<Heading>Details</Heading>
						<Text>{event.details}</Text>
					</View>
				</Section>}

				<EventChat event={event} user={user} />
			</Layout>
		)
	}
}

module.exports = EventPage