var React = require('react')
  , EventItem = require('./event-item')
  , Section = require('../layout/section')
  , Heading = require('../layout/heading')
  , Link = require('../core/link')
  , Text = require('../core/text')
  , View = require('../core/view')
  , time = require('../../util/time')

var styles = {}

styles.actionSection = {
	flexDirection: 'row',
	backgroundColor: '#444',
	paddingTop: 3,
	paddingBottom: 3,
	justifyContent: 'space-between'
}

styles.text = {
	color: '#fff'
}

styles.actions = {
	flexDirection: 'row',
	alignItems: 'flex-end',
	justifyContent: 'flex-end'
}

styles.action = {
	alignItems: 'flex-end',
	justifyContent: 'flex-end',
	cursor: 'pointer',
	fontWeight: 600,
	textDecoration: 'underline'
}

styles.edit = {
	color: '#fff',
	marginRight: 5
}

styles.cancel = {
	color: '#e92d2d',
	marginLeft: 5
}

styles.uncancel = {
	color: '#e92d2d'
}

styles.slash = {
	color: '#fff'
}

class ActionBar extends React.Component {
	render() {
		var { location, events, user } = this.props

		styles.edit = { ...styles.edit, ...styles.action }
		styles.cancel = { ...styles.cancel, ...styles.action }
		styles.uncancel = { ...styles.uncancel, ...styles.action }
		
		return (
			<Section style={styles.actionSection}>
				<Text style={styles.text}>You created this event.</Text>
				<View style={styles.actions}>
					{!this.props.event.cancelled ? (
						[<Link href={'/event/'+this.props.event.id+'/edit'} style={styles.edit}>Edit</Link>,
						<Text style={styles.slash}>/</Text>,
						<Link href={'/event/'+this.props.event.id+'/cancel'} style={styles.cancel}>Cancel</Link>]
					)
					: (
						<Link href={'/event/'+this.props.event.id+'/uncancel'} style={styles.uncancel}>UnCancel</Link>
					)}
				</View>
			</Section>
		)
	}
}

module.exports = ActionBar


