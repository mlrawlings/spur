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
	getHeaderString(num, on, over) {
		var count = num == 0 ? 'no' : num
		  , noun = num == 0 ? 'one' : num == 1 ? 'person' : 'people'
		  , verb = on && over ? 'went' : (on ? (num <= 1 ? 'is' : 'are') : (num <= 1 ? 'was' : 'were')) + ' going'
		 
		return count+' '+noun+' '+verb
	}
	render() {
		var { event, style } = this.props
		  , attendees = event.attendees
		  , on = !event.cancelled
		  , num = attendees.length
		  , over = event.time < Date.now()-20*60*1000
		
		return (
			<View style={style}>
				<Heading style={styles.going}>
					{this.getHeaderString(num, on, over)}
				</Heading>
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