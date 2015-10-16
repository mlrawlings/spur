var React = require('react')
  , Layout = require('../layout')
  , Hero = require('./hero')
  , DownloadAndShare = require('./download-and-share')
  , Video = require('./video')
  , About = require('./about')
  , Section = require('../layout/section')
  , Text = require('../core/text')

class Home extends React.Component {
	render() {
		return (
			<Layout user={this.props.user}>
		    	<Hero />	
				<DownloadAndShare />		
				<About user={this.props.user} />
			</Layout>
		)
	}
}

module.exports = Home