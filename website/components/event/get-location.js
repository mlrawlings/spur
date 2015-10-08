var React = require('react')
  , EventItem = require('./event-item')
  , Section = require('../layout/section')
  , Heading = require('../layout/heading')
  , Link = require('../core/link')
  , Text = require('../core/text')
  , View = require('../core/view')
  , Button = require('../core/button')
  , locationUtil = require('../../util/location')

var styles = {}

styles.getLocationText = {
	fontSize:40,
	color:'#666',
	textAlign:'center'
}

styles.letUsKnow = {
	fontSize:25,
	color:'#666',
	textAlign:'center'
}

styles.buttonContainer = {
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'center',
	marginTop: 40,
	marginBottom: 5
}

styles.detectLocation = {
	fontSize: 16,
	marginLeft: 5,
	marginRight: 5,
	backgroundColor: '#555',
	color: 'white'
}

styles.enterLocation = {
	fontSize: 16,
	marginLeft: 5,
	marginRight: 5,
	backgroundColor: '#ccc',
	color: '#444'
}

styles.neverShare = {
	textAlign: 'center',
	color: '#666'
}

class GetLocation extends React.Component {
	constructor(props) {
		super(props)
		this.state = { loading:false }
	}
	detect() {
		this.setState({ loading:true })
		locationUtil.getLocation().then(location => {
			this.setState({ loading:false })
			this.props.onDetect && this.props.onDetect(location)
		}).catch(e => {
			if(e.constructor.name === 'PositionError') {
				this.setState({ loading:false })
				alert('You have geolocation disabled. We can\'t detect your location until you enable it.')
			}
		})
	}
	render() {
		return (
			<Section>
				<Text style={styles.getLocationText}>
					Want to find nearby events?
				</Text>
				<Text style={styles.letUsKnow}>
					Let us know where to look!
				</Text>
				<View style={styles.buttonContainer}>
					<Button src="/images/current-location.png" style={styles.detectLocation} onClick={this.detect.bind(this)} loading={this.state.loading}>Detect my location</Button>
					<Button src="/images/pin-red.png" style={styles.enterLocation} onClick={this.props.onEnter}>Enter a location</Button>
				</View>
				<Text style={styles.neverShare}>
					We&apos;ll never share this location with anyone.
				</Text>
			</Section>
		)
	}
}

module.exports = GetLocation