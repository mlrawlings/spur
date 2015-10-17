var React = require('react')
  , Touchable = require('./touchable')

var styles = {}

styles.default = {
	textDecoration:'none'
}

styles.active = {
	opacity:0.6
}

class Link extends React.Component {
	render() {
		var { style, styleActive, ...props } = this.props

		style = { ...styles.default, ...style }
		styleActive = { ...styles.active, ...styleActive }

		return <Touchable tag="a" {...props} style={style} styleActive={styleActive} />
	}
}

module.exports = Link