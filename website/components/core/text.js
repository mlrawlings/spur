var React = require('react')
  , Touchable = require('./touchable')
  , prefix = require('auto-prefixer')

class Text extends React.Component {
	render() {
		if(this.props.href) return <Touchable tag="a" className="text" {...this.props} />
		if(this.props.onClick) return <Touchable tag="span" {...this.props} />

		var { tag, style, ...props } = this.props
		  , Tag = tag || 'span'
		
		return <Tag {...props} style={prefix(style)} />
	}
}

module.exports = Text