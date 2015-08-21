var React = require('react')
  , Layout = require('./layout')
  , EventList = require('./event-list')

class EventResults extends React.Component {
	componentDidMount() {
		console.log('mounted')
	}
	render() {
		return (
			<Layout fbid={this.props.fbid}>
				<div className="page">
					<section className="events-search">
						<div className="container">
							<form action="/events" className="search">
								<input name="q" type="text" placeholder="what do you want to do?" />
								<button type="submit">
									<img src="/images/search-white.png" />
								</button>
							</form>
							<a href="/create/event" className="button create">
								<span>Create Event +</span>
							</a>
						</div>
					</section>

					<EventList events={this.props.events} />
				</div>
			</Layout>
		)
	}
})

module.exports = EventResults
