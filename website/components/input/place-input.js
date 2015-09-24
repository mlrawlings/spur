var React = require('react')
  , PlaceSuggestions = require('./place-suggestions')
  , Input = require('../core/input')
  , Image = require('../core/image')
  , Link = require('../core/link')
  , View = require('../core/view')
  , Text = require('../core/text')
  , locationUtil = require('../../util/location')

const UP = 38
const DOWN = 40
const ENTER = 13

const MIN_TIME_BETWEEN_REQUESTS = 500

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

styles.loadingImage = {
	width: 15,
	marginRight:8
}

styles.input = {
	backgroundColor:'transparent',
	borderWidth:0,
	flex:1
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
			value = this.state.value.trim()
			this.searching = true
			Promise.race([
				locationUtil.getResultsFromSearch(value, this.props.location.coords).then((suggestions) => {
					this.setState({ suggestions, selected:0, loading:false })
					this.searching = false
					this.lastRequest = Date.now()
				}),
				new Promise((resolve, reject) => {
					setTimeout(() => {
						reject('timeout')
					}, 1000)
				})
			]).catch((e) => {
				console.error(e)
				this.lastRequest = Date.now()+1500
				this.searching = false
				this.getSuggestions()
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
		var value = e.target.value
		this.setState({ value })
		this.lastChange = Date.now()
		this.getSuggestions(value.trim(), Math.max(400, 1000-e.target.value.length*100))
	}
	makeSelection(suggestion) {
		setTimeout(() => this.props.onChange(suggestion))
		this.setState({ value:suggestion.formatted_address })
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
			this.setState({ value:nextProps.value })
		}
	}
	componentWillUnmount() {
		clearTimeout(this.timeout)
	}
	currentAddressMouseOver() {
		var domNode = React.findDOMNode(this.refs.input)
		this.inputValue = this.state.value
		this.inputSelection = document.activeElement == domNode && [domNode.selectionStart, domNode.selectionEnd]
		this.setState({ value:'Use Current Location' })
	}
	currentAddressMouseOut() {
		var domNode = React.findDOMNode(this.refs.input)
		if(this.state.value == 'Use Current Location') {
			this.setState({ value:this.inputValue })
			if(this.inputSelection) domNode.setSelectionRange(...this.inputSelection)
		}
	}
	currentAddressClick() {
		locationUtil.getLocation().then((location) => {
			this.setState({ value:location.formatted_address, loading:false })
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
						{
							this.state.loading 
							? <Image style={styles.loadingImage} src="/images/loading-on-white.gif" />
							: <Image style={styles.currentLocationImage} src="/images/current-location.png" />
						}
					</Link>
					<Input 
						ref="input"
						type="search" 
						value={this.state.value} 
						placeholder="Enter an address or place..." 
						{...props}
						style={{...styles.input, ...inputStyle}}
						onChange={this.onChange.bind(this)} 
						onFocus={this.onFocus.bind(this)} 
						onBlur={this.onBlur.bind(this)} 
						onKeyDown={this.onKeyDown.bind(this)} />
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