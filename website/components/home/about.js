var React = require('react')
  , Section = require('../layout/section')
  , Heading = require('../layout/heading')
  , Button = require('../core/button')
  , View = require('../core/view')
  , Link = require('../core/link')
  , Text = require('../core/text')

var styles = {}

styles.about = {
	paddingBottom:0
}

styles.header = {
	fontWeight:300,
	fontSize:28,
}

styles.paragraphText = {
	fontSize:16,
	marginTop:10
}

styles.actionText = {
	fontSize:18,
	padding:10
}

styles.action = {
	flexDirection:'row',
	justifyContent:'space-between',
	alignItems:'stretch',
	backgroundColor:'#fff',
	marginTop:10,
	borderWidth:1,
	borderColor:'#ddd'
}

styles.actionBanner = {
	marginLeft:20,
	width:150,
	color:'#fff',
	alignItems:'center',
	justifyContent:'center',
	fontSize:14,
	fontWeight:600
}
styles.actionCreate = {
	...styles.actionBanner,
	backgroundColor:'#0DBD6F'
}
styles.actionNearby = {
	...styles.actionBanner,
	backgroundColor:'#0599cd'
}
styles.actionFeedback = {
	...styles.actionBanner,
	backgroundColor:'#ff5e97'
}
styles.actionSignup = {
	...styles.actionBanner,
	backgroundColor:'#3c4f62'
}

class About extends React.Component {
	render() {
		var { user } = this.props
		
		return (
			<View>
				<Section style={styles.about}>
					<Text style={styles.header}>We&apos;re just getting started!</Text>
					<Text style={styles.paragraphText}>
						It&apos;s still early, so don&apos;t expect a huge number of people 
						to discover your event just yet... unless they were invited.  
						In that case, they probably know about it. 
					</Text>
				</Section>
				<Section style={styles.excite}>
					<Text style={styles.header}>Excited? Here&apos;s what you can do:</Text>
					{user && <Link href="/create/event" style={styles.action}>
						<Text style={styles.actionText}>Spur something awesome!</Text>
						<View style={styles.actionCreate}>Create an event</View>
					</Link>}
					<Link href="/events" style={styles.action}>
						<Text style={styles.actionText}>See what&apos;s happening near you!</Text>
						<View style={styles.actionNearby}>Nearby Events</View>
					</Link>
					<Link href="mailto:spur@embarkweb.com" style={styles.action}>
						<Text style={styles.actionText}>Got ideas? Found a bug? Want to say hi?</Text>
						<View style={styles.actionFeedback}>Send Feedback</View>
					</Link>
					{!user && <Link href="/facebook/login" style={styles.action}>
						<Text style={styles.actionText}>Sign up so you we can let you know when things really kick off!</Text>
						<View style={styles.actionSignup}>Sign up</View>
					</Link>}
				</Section>
			</View>
		)
	}
}

module.exports = About