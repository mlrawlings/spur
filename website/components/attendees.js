var React = require('react')
  , Section = require('./common/section')
  , Heading = require('./common/heading')
  , Text = require('./common/text')
  , View = require('./common/view')
  , Image = require('./common/image')

var styles = {}

class Attendees extends React.Component {
	render() {
		return (
			<View>
				{this.props.event.attendees.map(function(attendee) {
					return <View>
						<Text>{attendee}</Text>
						<Image src={'https://graph.facebook.com/'+attendee+'/picture'} />
					</View>
				})}
			</View>
		)
	}
}

module.exports = Attendees