var React = require('react')
  , Section = require('../layout/section')
  , Heading = require('../layout/heading')
  , Image = require('../core/image')
  , Text = require('../core/text')
  , View = require('../core/view')

var styles = {}

styles.attendee = {
	alignItems:'center',
	flexDirection:'row',
	justifyContent:'flex-end',
	marginTop: 5
}

styles.picture = {
	height: 25,
	marginLeft: 5
}

class Attendees extends React.Component {
	render() {
		return (
			<View>
				{this.props.event.attendees.map(function(attendee) {
					return <View style={styles.attendee}>
						<Text>{attendee.name.first}</Text>
						<Image style={styles.picture} src={'https://graph.facebook.com/'+attendee.fbid+'/picture'} />
					</View>
				})}
			</View>
		)
	}
}

module.exports = Attendees