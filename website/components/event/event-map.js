var React = require('react')
  , GoogleMap = require('../map/google-map')
  , GoogleMapMarker = require('../map/google-map-marker')
  , View = require('../core/view')
  , Text = require('../core/text')

var styles = {}

styles.mapCover = {
	zIndex: 1,
	width: '100%',
	height: '100%',
	position: 'absolute',
	justifyContent: 'center',
	alignItems: 'center',
	background: 'rgba(0, 0, 0, 0.55)'
}

styles.cancelledText = {
	color: 'white',
	fontSize: 40,
	fontWeight: 300
}

class EventMap extends React.Component {
	render() {
		var { event } = this.props

		return (
			<View query="(min-width:501px) and (min-height:501px)">
				<GoogleMap center={event.location.coords} zoom={17}>
					{event.cancelled && <View style={styles.mapCover}>
						<Text style={styles.cancelledText}>CANCELLED</Text>
					</View>}
					<GoogleMapMarker position={event.location.coords} />
				</GoogleMap>
			</View>
		)
	}
}

module.exports = EventMap