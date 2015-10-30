var React = require('react')
  , Layout = require('../layout')
  , Section = require('../layout/section')
  , Avatar = require('../core/avatar')
  , Text = require('../core/text')
  , View = require('../core/view')
  , TimeUntil = require('../format/time-until')

var styles = {}

styles.notification = {
	flexDirection: 'row',
	border: '1px solid #ddd',
	marginTop: 15,
	backgroundColor: '#fff'
}

styles.info = {
	padding: 10
}

styles.title = {
	fontSize: 20
}

styles.time = {
	color: '#aaa'
}

styles.avatar = {
	width: 70,
	borderRadius: 0
}

class Notification extends React.Component {
	render() {
		var notification = this.props.notification

		return (
			<View style={styles.notification} href={notification.url}>
				<Avatar style={styles.avatar} user={notification.user} />
				<View style={styles.info}>
					<Text style={styles.title}>{notification.title}</Text>
					<Text>{notification.body} <TimeUntil style={styles.time} time={notification.time} /></Text>
					
				</View>
			</View>
		)
	}
}

module.exports = Notification
