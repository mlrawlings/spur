var React = require('react')
  , Section = require('./common/section')
  , Heading = require('./common/heading')
  , Text = require('./common/text')

var styles = {}

styles.about = {
	backgroundColor:'#fff'
}

class About extends React.Component {
	render() {
		return (
			<Section style={styles.about}>
				<Heading>what is spur?</Heading>
				<Text>
					Spur lets you post and find `moments`.  
					These moments are kind of like mini-events that are happening anywhere from right this second to 24 hours in the future.
					And they can be just about anything: walking your dog, playing a game of halo, going for a run, or even a game of soccer.
				</Text>
			</Section>
		)
	}
}

module.exports = About