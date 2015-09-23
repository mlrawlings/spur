var React = require('react')
  , Input = require('../core/input')
  , Image = require('../core/image')
  , Link = require('../core/link')
  , View = require('../core/view')
  , Text = require('../core/text')
  , locationUtil = require('../../util/location')

const UP = 38
const DOWN = 40
const ENTER = 13

const MIN_TIME_BETWEEN_REQUESTS = 1200

var styles = {}

styles.container = {
	flexDirection: 'row',
	borderWidth:1,
	borderColor:'#ddd',
	backgroundColor:'#fff'
}

styles.suggestionsContainer = {
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

styles.suggestionName = {
	fontWeight:600,
}

styles.suggestionAddress = {
	fontSize:13,
}

styles.currentLocationLink = {
	cursor: 'pointer',
	justifyContent:'center'
}

styles.currentLocationImage = {
	width: 15,
	top: 1,
	marginRight:8
}

styles.input = {
	backgroundColor:'transparent',
	borderWidth:0,
	flex:1
}

styles.loading = {
	fontSize:10,
	fontWeight:600,
	color:'#666'
}

class GooglePlaceInput extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			focused:false,
			selected:0,
			suggestions:[],
			loading:false
		}
	}
	getTimeRemaining() {
		return Math.max(this.lastRequest-Date.now()+MIN_TIME_BETWEEN_REQUESTS||0, 0)
	}
	getSuggestions(value, throttle) {
		var waitTime = Math.max(this.getTimeRemaining(), throttle)

		value = value.trim()

		clearTimeout(this.timeout)

		if(!value) {
			return this.setState({ suggestions:[], loading:false })
		}

		this.setState({ loading:true })

		this.timeout = setTimeout(() => {
			console.log('SEARCH FOR:', value)
			locationUtil.getResultsFromSearch(value, this.props.location.coords).then((suggestions) => {
				this.setState({ suggestions, selected:0, loading:false })
				this.lastRequest = Date.now()
			}).catch((e) => {
				console.error(e)
				this.lastRequest = Date.now()+2000
				this.getSuggestions(value, 0)
			})
		}, waitTime)
	}
	onFocus() {
		this.setState({ focused:true })
	}
	onBlur() {
		this.setState({ focused:false })
	}
	onChange(e) {
		this.lastChange = Date.now()
		this.getSuggestions(e.target.value, 1000-e.target.value.length*100)
	}
	makeSelection(suggestion) {
		setTimeout(() => this.props.onChange(suggestion))
		React.findDOMNode(this.refs.input).value = suggestion.formatted_address
	}
	onKeyDown(e) {
		var suggestions = this.state.suggestions
		  , numSuggestions = suggestions.length
		  , selected = this.state.selected
		  , currentSuggestion = suggestions[selected]

		if(e.which == UP) {
			this.setState({ selected:(numSuggestions+selected-1)%numSuggestions || 0 })
			e.preventDefault()
		}
		if(e.which == DOWN) {
			this.setState({ selected:(selected+1)%numSuggestions || 0 })
			e.preventDefault()
		}
		if(e.which == ENTER) {
			this.makeSelection(currentSuggestion)
			e.preventDefault()
		}
	}
	componentWillReceiveProps(nextProps) {
		if(nextProps.value != this.props.value) {
			React.findDOMNode(this.refs.input).value = nextProps.value
		}
	}
	componentWillUnmount() {
		clearTimeout(this.timeout)
	}
	currentAddressMouseOver() {
		var domNode = React.findDOMNode(this.refs.input)

		this.inputValue = domNode.value
		this.inputSelection = document.activeElement == domNode && [domNode.selectionStart, domNode.selectionEnd]
		domNode.value = 'Use Current Location'
	}
	currentAddressMouseOut() {
		var domNode = React.findDOMNode(this.refs.input)
		if(domNode.value == 'Use Current Location') {
			domNode.value = this.inputValue
			if(this.inputSelection) domNode.setSelectionRange(...this.inputSelection)
		}
	}
	currentAddressClick() {
		locationUtil.getLocation().then((location) => {
			this.setState({ value: location.formatted_address, loading:false })
			React.findDOMNode(this.refs.input).value = location.formatted_address
			this.props.onChange && this.props.onChange(location)
		})
	}
	render() {
		var { value, style, onChange, ...props } = this.props
		  , { padding, paddingLeft, paddingRight, paddingBottom, paddingTop, height, ...containerStyle} = style
		  , inputStyle = {padding, paddingLeft, paddingRight, paddingBottom, paddingTop, height}
		  , linkStyle = styles.currentLocationLink

		inputStyle.padding = 2
		linkStyle.paddingLeft = paddingLeft || padding

		Object.keys(inputStyle).forEach(function(style) {
			if(inputStyle[style] === undefined) delete inputStyle[style]
		})

		return (
			<View>
				<View style={{ ...styles.container, ...containerStyle}}>
					<Link style={linkStyle} onMouseOver={this.currentAddressMouseOver.bind(this)} onMouseOut={this.currentAddressMouseOut.bind(this)} onClick={this.currentAddressClick.bind(this)}>
						<Image style={styles.currentLocationImage} src="/images/current-location.png" />
					</Link>
					<Input 
						ref="input"
						type="search" 
						defaultValue={value} 
						placeholder="Enter an address or place..." 
						{...props} 
						style={{...styles.input, ...inputStyle}}
						onChange={this.onChange.bind(this)} 
						onFocus={this.onFocus.bind(this)} 
						onBlur={this.onBlur.bind(this)} 
						onKeyDown={this.onKeyDown.bind(this)} />
				</View>
				<View style={styles.suggestionsMount}>
					<View style={styles.suggestionsContainer}>
						{this.state.loading && <View style={styles.suggestion}>
							<Text style={styles.loading}>LOADING...</Text>
						</View>}
						{this.state.focused && this.state.suggestions.map((suggestion, i) => {
							return <View style={styles.suggestion} ref={suggestion.place_id} onMouseDown={this.makeSelection.bind(this, suggestion)}>
								<Text style={styles.suggestionName}>
									{suggestion.name}
								</Text>
								<Text style={styles.suggestionAddress}>
									{(i == this.state.selected ? '* ' : '') + suggestion.formatted_address}
								</Text>
							</View>
						})}
					</View>
				</View>
			</View>
		)
	}
}

module.exports = GooglePlaceInput