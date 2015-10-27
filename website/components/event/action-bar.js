var React = require('react')
  , EventItem = require('./event-item')
  , Section = require('../layout/section')
  , Heading = require('../layout/heading')
  , Link = require('../core/link')
  , Text = require('../core/text')
  , View = require('../core/view')
  , timeUtil = require('../../util/time')

var styles = {}

styles.actionSection = {
	flexDirection: 'row',
	padding: 0,
	paddingTop: 3,
	paddingBottom: 3
}

styles.text = {
	color: '#444'
}

styles.actions = {
	flexDirection: 'row',
	padding: 0,
	alignItems: 'flex-start',
	justifyContent: 'flex-start'
}

styles.action = {
	alignItems: 'flex-start',
	justifyContent: 'flex-start',
	cursor: 'pointer',
	fontWeight: 600,
	textDecoration: 'underline'
}

styles.edit = {
	color: '#444',
	marginRight: 5
}

styles.cancel = {
	color: '#e92d2d',
	marginLeft: 5
}

styles.uncancel = {
	color: 'rgb(4, 190, 202)'
}

styles.slash = {
	color: '#444'
}

styles.eventOver = {
	color: '#444'
}

class ActionBar extends React.Component {
	render() {
		var { user } = this.context
		  , { event } = this.props
		  , isOwner = user && user.id == event.owner
		  , eventIsOver = (event.endTime ? event.endTime : timeUtil.sixHoursFrom(event.time)) < new Date()

		styles.edit = { ...styles.edit, ...styles.action }
		styles.cancel = { ...styles.cancel, ...styles.action }
		styles.uncancel = { ...styles.uncancel, ...styles.action }
		
		return !!isOwner && (
			<View style={styles.actions}>
				{!eventIsOver && (!event.cancelled ? ([
					<Link href={'/event/'+event.id+'/edit'} style={styles.edit}>Edit</Link>,
					<Text style={styles.slash}>/</Text>,
					<Link href={'/event/'+event.id+'/cancel'} style={styles.cancel}>Cancel</Link>
				]) : (
					<Link href={'/event/'+event.id+'/uncancel'} style={styles.uncancel}>UnCancel</Link>
				))}

				{eventIsOver && <Text style={styles.eventOver}>This event has ended.</Text>}
			</View>
		)
	}
}

ActionBar.contextTypes = {
	user:React.PropTypes.object
}

module.exports = ActionBar


