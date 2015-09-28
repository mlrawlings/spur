var React = require('react')
  , Link = require('../core/link')
  , View = require('../core/view')
  , Text = require('../core/text')

var styles = {}

styles.container = {
	position:'absolute',
	top:0,
	left:0,
	width:'100%',
	zIndex:10,
	borderBottomWidth:1,
	borderBottomColor:'#ddd'
}

styles.suggestion = {
	padding:10,
	borderTopWidth:1,
	borderTopColor:'#ddd',
	backgroundColor:'#fff',
	cursor:'pointer',
	opacity:0.95
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
						return <View style={styles.suggestion} ref={suggestion.id} onMouseDown={onSelect.bind(this, suggestion)}>
							<Text style={styles.name}>
								{suggestion.name}
							</Text>
							<Text style={styles.address}>
								{(i == selected ? '* ' : '') + suggestion.full}
							</Text>
						</View>
					})}
				</View>
			</View>
		)
	}
}

module.exports = PlaceSuggestions