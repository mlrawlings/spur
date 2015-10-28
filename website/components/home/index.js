var React = require('react')
  , Layout = require('../layout')
  , Hero = require('./hero')
  , AppLinks = require('./app-links')
  , Video = require('./video')
  , About = require('./about')
  , Section = require('../layout/section')
  , Text = require('../core/text')

class Home extends React.Component {
	render() {
		return (
			<Layout>
		    	<Hero />	
				<AppLinks />		
				<About />
			</Layout>
		)
	}
}

module.exports = Home