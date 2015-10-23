var React = require('react')
  , prefix = require('auto-prefixer')

var styles = {}

styles.normal = {
	cursor:'pointer'
}

styles.active = {
	opacity:0.6
}

class Touchable extends React.Component {
	constructor(props) {
		super(props)
		this.state = { hover:false, active:false }
	}
	press() {
		this.setState({ active:true })
	}
	release() {
		this.setState({ active:false })
	}
	hover() {
		this.setState({ hover:true })
	}
	leave() {
		this.setState({ hover:false, active:false })
	}
	getStyle() {
		var { style, styleActive, styleHover } = this.props

		if(this.state.active) {
			return  { ...styles.normal, ...style, ...styles.active, ...styleActive }
		}

		if(this.state.hover) {
			return  { ...styles.normal, ...style, ...styles.hover, ...styleHover }
		}

		return { ...styles.normal, ...style}
	}
	render() {
		var { style, styleActive, styleHover, tag, ...props } = this.props
		  , Tag = tag || 'a'
		  , linkStyle = this.getStyle()
		  , press = this.press.bind(this)
		  , release = this.release.bind(this)
		  , hover = this.hover.bind(this)
		  , leave = this.leave.bind(this)

		return (
			<Tag {...props} 
				style={prefix(linkStyle)} 
				onMouseDown={press} 
				onMouseUp={release} 
				onMouseEnter={hover} 
				onMouseLeave={leave} 
				onTouchStart={press} 
				onTouchEnd={release} 
				onTouchMove={release} />
		)
	}
}

module.exports = Touchable