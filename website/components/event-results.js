var React = require('react')
  , Layout = require('./layout')
  , EventList = require('./event-list')
  , Section = require('./common/section')
  , Button = require('./common/button')
  , Image = require('./common/image')
  , Text = require('./common/text')

var styles = {}

styles.icon = {
	width:20,
	height:20
}

class EventResults extends React.Component {
	render() {
		return (
			<Layout fbid={this.props.fbid}>
				<Section>
					<form action="/events">
						<input name="q" type="text" placeholder="what do you want to do?" />
						<Button type="submit">
							<Image style={styles.icon} src="/images/search-white.png" />
						</Button>
					</form>
					<Button href="/create/event">
						<Text>Create Event +</Text>
					</Button>
				</Section>

				<EventList events={this.props.events} />
			</Layout>
		)
	}
}

module.exports = EventResults
