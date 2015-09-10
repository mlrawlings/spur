var React = require('react')
  , Section = require('./common/section')
  , Heading = require('./common/heading')
  , Text = require('./common/text')
  , View = require('./common/view')
  , Image = require('./common/image')

var styles = {}

styles.attendee = {
	alignItems:'flex-end'
}

class Attendees extends React.Component {
	render() {
		return (
			<View>
				{this.props.event.attendees.map(function(attendee) {
					return <View style={styles.attendee}>
						<Text>{attendee.name.first}</Text>
						<Image src={'https://graph.facebook.com/'+attendee.fbid+'/picture'} />
					</View>
				})}
			</View>
		)
	}
}

module.exports = Attendees