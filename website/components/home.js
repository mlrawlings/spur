var React = require('react')
  , Layout = require('./layout')
  , Hero = require('./hero')
  , About = require('./about')
  , EventList = require('./event-list')


class Home extends React.Component {
	render() {
		return (
			<Layout user={this.props.user}>
		    	<Hero />			
				<About />
				<EventList events={this.props.events} location={this.props.location} />
			</Layout>
		)
	}
}

module.exports = Home