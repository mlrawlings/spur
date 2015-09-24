var React = require('react')
  , Section = require('../layout/section')
  , Heading = require('../layout/heading')
  , Image = require('../core/image')
  , Text = require('../core/text')
  , Link = require('../core/link')
  , View = require('../core/view')

var styles = {}

styles.container = {
	width:'100%',
	flexDirection:'row',
	overflow:'auto',
	paddingTop:5,
	paddingBottom:5
}

styles.attendee = {
	alignItems:'center',
	flexDirection:'row',
	justifyContent:'flex-start',
	marginRight:20,
}

styles.picture = {
	height: 35,
	marginRight: 5,
	borderRadius:4
}

class Attendees extends React.Component {
	render() {
		var { event, style } = this.props
		  , attendees = event.attendees
		  , num = attendees.length
		
		return (
			<View style={style}>
				<Heading style={styles.going}>{(!num ? 'No one is' : num == 1 ? '1 Person is' : num + ' People are') + ' Going'}</Heading>	
				<View style={styles.container}>
					{attendees.map(attendee =>
						<Link style={styles.attendee} href={'/profile/'+attendee.id}>
							<Image style={styles.picture} src={'https://graph.facebook.com/'+attendee.fbid+'/picture'} />
							<Text>{attendee.name.first}</Text>
						</Link>
					)}
				</View>
			</View>
		)
	}
}

module.exports = Attendees