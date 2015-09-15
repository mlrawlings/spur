var React = require('react')
  , Layout = require('../layout')
  , Hero = require('./hero')
  , DownloadAndShare = require('./download-and-share')
  , Video = require('./video')
  , EventList = require('../event/event-list')

class Home extends React.Component {
	render() {
		return (
			<Layout user={this.props.user}>
		    	<Hero />			
				<DownloadAndShare />
				<Video />
				<EventList events={this.props.events} location={this.props.location} />
			</Layout>
		)
	}
}

module.exports = Home