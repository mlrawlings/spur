var React = require('react')
  , prefix = require('auto-prefixer')

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
	render() {
		var { style, styleActive, styleHover, tag, ...props } = this.props
		  , Tag = tag || 'a'
		  , linkStyle = this.state.active ? { ...style, ...styleActive } : this.state.hover ? { ...style, ...styleHover } : style
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