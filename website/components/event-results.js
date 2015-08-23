var React = require('react')
  , Layout = require('./layout')
  , EventList = require('./event-list')
  , SearchInput = require('./inputs/search-input')
  , Section = require('./common/section')
  , Button = require('./common/button')
  , Image = require('./common/image')
  , Text = require('./common/text')

var styles = {}

class EventResults extends React.Component {
	render() {
		return (
			<Layout fbid={this.props.fbid}>
				<Section>
					<form action="/events">
						<SearchInput name="q" defaultValue={this.props.search} />
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
