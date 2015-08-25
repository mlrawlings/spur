var React = require('react')
  , GeoPoint = require('geopoint')
  , GoogleMap = require('google-map-react')
  , Image = require('../common/image')
  , View = require('../common/view')
  , locationUtil = require('../../util/location')

var styles = {}

styles.googleMap = {
	height: 150,
	width: '100%'
}

styles.pin = {
	width:30,
	height:38,
	marginTop:-38,
	marginLeft:-15
}

class SpurMap extends React.Component {
	render() {
		var { style, coords, zoom, ...props } = this.props
		return (
			<View {...props} style={{ ...styles.googleMap, ...style }}>
				<GoogleMap center={coords} zoom={zoom || 16}>
					<View lat={coords[0]} lng={coords[1]}>
						<Image style={styles.pin} src="/images/spur-pin.png" />
					</View>
				</GoogleMap>
			</View>
		)
	}
}

module.exports = SpurMap