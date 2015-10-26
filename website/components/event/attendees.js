var React = require('react')
  , Section = require('../layout/section')
  , Heading = require('../layout/heading')
  , Avatar = require('../core/avatar')
  , Text = require('../core/text')
  , Link = require('../core/link')
  , View = require('../core/view')
  , timeUtil = require('../../util/time')

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
	width:35,
	height:35,
	marginRight: 5,
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
		  , eventIsOver = (event.endTime ? event.endTime : timeUtil.sixHoursFrom(event.time)) < new Date()
		
		return (
			<View style={style}>
				<Heading style={styles.going}>
					{this.getHeaderString(num, on, eventIsOver)}
				</Heading>
				<View style={styles.container}>
					{attendees.map(attendee =>
						<Link style={styles.attendee} href={'/profile/'+attendee.id}>
							<Avatar style={styles.picture} user={attendee} />
							<Text>{attendee.name.first}</Text>
						</Link>
					)}
				</View>
			</View>
		)
	}
}

module.exports = Attendees