var React = require('react')
  , PlaceSuggestions = require('./place-suggestions')
  , Input = require('../core/input')
  , Image = require('../core/image')
  , Link = require('../core/link')
  , View = require('../core/view')
  , Text = require('../core/text')
  , locationUtil = require('../../util/location')
  , Color = require('color')


const UP = 38
const DOWN = 40
const ENTER = 13

const MIN_TIME_BETWEEN_REQUESTS = 500
const ERROR_MESSAGE = 'Please type an address and then select a location from the search results.'

var styles = {}

styles.container = {
	flexDirection: 'row',
	borderWidth:1,
	borderColor:'#ddd',
	backgroundColor:'#fff'
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

styles.currentLocationText = {
	position:'absolute',
	top:0,
	left:0,
	width:'100%',
	height:'100%',
	backgroundColor:'#fff',
	justifyContent:'center',
	color:Input.style.color
}

styles.loadingImage = {
	width: 15,
	marginRight:8
}

styles.inputContainer = {
	flex:1
}

styles.input = {
	backgroundColor:'transparent',
	borderWidth:0
}

class PlaceInput extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			focused:false,
			selected:0,
			suggestions:[],
			loading:false,
			value:props.defaultValue
		}
		this.callNum = 0
	}
	getTimeRemaining() {
		var timeSince = Date.now()-this.lastRequest
		  , timeRemaining = MIN_TIME_BETWEEN_REQUESTS-timeSince
		
		return Math.max(timeRemaining||0, 0)
	}
	getSuggestions(value, throttle) {
		var waitTime = Math.max(this.getTimeRemaining(), throttle||0)

		clearTimeout(this.timeout)

		if(!value) {
			this.searching = false
			return this.setState({ suggestions:[], loading:false })
		}

		if(this.searching) {
			return this.timeout = setTimeout(() => this.getSuggestions(), waitTime)
		}

		this.setState({ loading:true })

		this.timeout = setTimeout(() => {
			var localCallNum = ++this.callNum
			value = this.state.value.trim()
			this.searching = true
			Promise.race([
				locationUtil.getResultsFromSearch(value, this.props.location && this.props.location.coords).then((suggestions) => {
					if(localCallNum != this.callNum) return

					this.setState({ suggestions, selected:0, loading:false })
					this.searching = false
					this.lastRequest = Date.now()
					if(value != this.state.value.trim()) {
						this.getSuggestions(this.state.value.trim())
					}
				}),
				new Promise((resolve, reject) => {
					setTimeout(() => {
						reject('timeout')
					}, 10000)
				})
			]).catch((e) => {
				if(localCallNum != this.callNum) return

				console.error(e.stack)
				this.lastRequest = Date.now()+1500
				this.searching = false
				this.getSuggestions(this.state.value.trim())
			})
		}, waitTime)
	}
	onFocus() {
		setTimeout(() => React.findDOMNode(this.refs.input).select())
		this.setState({ focused:true })
	}
	onBlur() {
		var { loading, focused, suggestions, selected } = this.state

		if(focused) this.setState({ focused:false })

		if(loading) {
			setTimeout(this.onBlur.bind(this), 10)
			return React.findDOMNode(this.refs.input).setCustomValidity(ERROR_MESSAGE)
		}

		if(suggestions.length) {
			this.makeSelection(suggestions[selected], selected)
		} else {
			React.findDOMNode(this.refs.input).setCustomValidity(ERROR_MESSAGE)
			this.props.onError && this.props.onError(new Error(ERROR_MESSAGE))
		}
	}
	onChange(e) {
		var value = e.target.value
		this.setState({ value })
		this.lastChange = Date.now()
		this.getSuggestions(value.trim(), Math.max(400, 1000-e.target.value.length*100))
	}
	makeSelection(suggestion, i) {
		setTimeout(() => this.props.onChange(suggestion))
		this.setState({ value:suggestion.full, selected:i })
		React.findDOMNode(this.refs.input).setCustomValidity('')
	}
	onKeyDown(e) {
		var suggestions = this.state.suggestions
		  , numSuggestions = suggestions.length
		  , selected = this.state.selected

		this.setState({ hoverCurrentLocation:false })

		if(e.which == UP) {
			this.setState({ selected:(numSuggestions+selected-1)%numSuggestions || 0 })
			e.preventDefault()
		}
		if(e.which == DOWN) {
			this.setState({ selected:(selected+1)%numSuggestions || 0 })
			e.preventDefault()
		}
		if(e.which == ENTER) {
			React.findDOMNode(this.refs.input).blur()
			e.preventDefault()
		}
	}
	componentWillReceiveProps(nextProps) {
		if(nextProps.value && nextProps.value != this.props.value) {
			this.setState({ value:nextProps.value })
		}
	}
	componentWillUnmount() {
		clearTimeout(this.timeout)
	}
	currentAddressMouseOver() {
		this.setState({ hoverCurrentLocation:true })
	}
	currentAddressMouseOut() {
		this.setState({ hoverCurrentLocation:false })
	}
	currentAddressClick() {
		this.setState({ detecting:true })
		locationUtil.getLocation().then(location => {
			this.setState({ value:location.full, suggestions:[location], loading:false, detecting:false, hoverCurrentLocation:false })
			this.props.onChange && this.props.onChange(location)
			React.findDOMNode(this.refs.input).setCustomValidity('')
		}).catch(e => {
			if(e.constructor.name === 'PositionError') {
				this.setState({ detecting:false, hoverCurrentLocation:false })
				alert('You have geolocation disabled. We can\'t detect your location until you enable it.')
			}
		})
	}
	focus() {
		React.findDOMNode(this.refs.input).focus()
	}
	render() {
		var { value, style, onChange, ...props } = this.props
		  , { padding, paddingLeft, paddingRight, paddingBottom, paddingTop, color, height, ...containerStyle} = style
		  , inputStyle = {padding, paddingLeft, paddingRight, paddingBottom, paddingTop, color, height}
		  , linkStyle = styles.currentLocationLink
		  , backgroundColor = Color(style.backgroundColor || styles.container.backgroundColor)
		  , currentLocationTextStyles = { 
		  		...styles.currentLocationText, 
		  		backgroundColor:style.backgroundColor || styles.currentLocationText.backgroundColor,
		  		color:style.color || styles.currentLocationText.color
		  	}

		inputStyle.paddingLeft = 2
		linkStyle.paddingLeft = paddingLeft || padding

		Object.keys(inputStyle).forEach(function(style) {
			if(inputStyle[style] === undefined) delete inputStyle[style]
		})

		return (
			<View>
				<View style={{ ...styles.container, ...containerStyle}}>
					<Link style={linkStyle} onMouseOver={this.currentAddressMouseOver.bind(this)} onMouseOut={this.currentAddressMouseOut.bind(this)} onClick={this.currentAddressClick.bind(this)}>
						{
							this.state.loading || this.state.detecting
							? <Image style={styles.loadingImage} src={backgroundColor.light() ? "/images/black-tail-spin.svg" : "/images/white-tail-spin.svg"} />
							: <Image style={styles.currentLocationImage} src="/images/current-location.png" />
						}
					</Link>
					<View style={styles.inputContainer}>
						<Input 
							ref="input"
							type="search" 
							value={this.state.value} 
							placeholder="Enter address or place..." 
							{...props}
							style={{...styles.input, ...inputStyle}}
							onChange={this.onChange.bind(this)} 
							onFocus={this.onFocus.bind(this)} 
							onBlur={this.onBlur.bind(this)} 
							onKeyDown={this.onKeyDown.bind(this)} />
						{(this.state.hoverCurrentLocation || this.state.detecting) && 
							<View style={currentLocationTextStyles}>
								{(this.state.detecting ? 'Detecting' : 'Use') +' Current Location'}
							</View>
						}
					</View>
				</View>
				{this.state.focused && this.state.value && <PlaceSuggestions 
					suggestions={this.state.suggestions} 
					loading={this.state.loading}
					selected={this.state.selected} 
					onSelect={this.makeSelection.bind(this)} />}
			</View>
		)
	}
}

module.exports = PlaceInput