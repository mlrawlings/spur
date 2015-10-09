var React = require('react')
  , Image = require('../core/image')
  , Link = require('../core/link')
  , View = require('../core/view')
  , Text = require('../core/text')
  , Touchable = require('../core/touchable')

var styles = {}

styles.container = {
	position:'absolute',
	top:0,
	left:-1,
	right:-1,
	zIndex:10,
	borderLeftWidth:1,
	borderLeftColor:'#ddd',
	borderRightWidth:1,
	borderRightColor:'#ddd',
	borderBottomWidth:1,
	borderBottomColor:'#ddd',
	overflow:'hidden'
}

styles.suggestion = {
	padding:10,
	borderTopWidth:1,
	borderTopColor:'#ddd',
	backgroundColor:'#fff',
	cursor:'pointer',
	opacity:0.95,
	flexDirection:'row',
	alignItems:'center'
}

styles.suggestionSelected = {
	...styles.suggestion,
	backgroundColor:'#eee'
}

styles.suggestionHover = {
	backgroundColor:'#ddd'
}

styles.name = {
	fontWeight:600,
}

styles.address = {
	fontSize:13,
}

styles.info = {
	fontSize:10,
	fontWeight:600,
	color:'#666'
}

styles.pin = {
	height: 24,
	width:15,
	marginRight:10,
	flexShrink: 0
}

class PlaceSuggestions extends React.Component {
	render() {
		var { loading, suggestions, onSelect, selected } = this.props

		return (
			<View>
				<View style={styles.container}>
					{!suggestions.length && <View style={styles.suggestion}>
						<Text style={styles.info}>{loading ? 'LOADING...' : 'No Results.  Try another search.'}</Text>
					</View>}
					{suggestions.map((suggestion, i) => {
						var hasName = !!suggestion.name
						  , suggestionStyles = i == selected ? styles.suggestionSelected : styles.suggestion
						  , pinIconSrc = '/images/pin-'+(i == selected ? 'red' : 'grey')+'.png'

						return <Touchable style={suggestionStyles} styleHover={styles.suggestionHover} ref={suggestion.id} onMouseDown={onSelect.bind(this, suggestion, i)}>
							<Image style={styles.pin} src={pinIconSrc} />
							<View>
								<Text style={styles.name}>
									{hasName ? suggestion.name : suggestion.street}
								</Text>
								<Text style={styles.address}>
									{hasName ? suggestion.full : suggestion.citystatezip}
								</Text>
							</View>
						</Touchable>
					})}
				</View>
			</View>
		)
	}
}

module.exports = PlaceSuggestions