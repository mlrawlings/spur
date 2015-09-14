var React = require('react')
  , Section = require('../layout/section')
  , Heading = require('../layout/heading')
  , Image = require('../core/image')
  , Text = require('../core/text')
  , Link = require('../core/link')
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
	marginLeft: 5,
	borderRadius:4
}

class Attendees extends React.Component {
	render() {
		var { event, style } = this.props
		
		return (
			<View style={style}>
				<Heading style={styles.going}>{event.attendees.length + ' Going'}</Heading>	
				{event.attendees.map(attendee =>
					<Link style={styles.attendee} href={'/profile/'+attendee.id}>
						<Text>{attendee.name.first}</Text>
						<Image style={styles.picture} src={'https://graph.facebook.com/'+attendee.fbid+'/picture'} />
					</Link>
				)}
			</View>
		)
	}
}

module.exports = Attendees