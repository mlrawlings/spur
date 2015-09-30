var React = require('react')
  , Touchable = require('./touchable')
  , Image = require('./image')
  , Text = require('./text')
  , View = require('./view')

var styles = {}

styles.normal = {
	fontFamily: 'Open Sans, sans-serif',
	fontWeight: 600,
	fontSize: 14,
	textAlign: 'center',

	padding:8,
	paddingBottom:5,
	borderWidth: 0,
	borderBottomWidth: 3,
	borderRadius: 4,

	backgroundColor: '#04beca',
	borderBottomColor:'rgba(0,0,0,0.2)',

	textDecoration: 'none',
	cursor:'pointer'
}

styles.wrapper = {
	flexDirection:'row',
	alignItems:'center',
	flex:1
}

styles.active = {
	top:2,
	paddingBottom: 8,
	borderBottomWidth: 0,
	outline:'none'
}

styles.image = {
	width:20,
	height:20
}

styles.text = {
	paddingLeft:6,
	paddingRight:6,
	color:'#fff'
}

styles.textWithIcon = {
	...styles.text,
	marginLeft:8,
}

class Button extends React.Component {
	render() {
		var { style, styleActive, src, children, ...props } = this.props
		  , tag = this.props.href ? 'a' : 'button'
		  , textStyles = { ...(src ? styles.textWithIcon : styles.text), color:style && style.color || styles.text.color }

		return (
			<Touchable tag={tag} {...props} style={{ ...styles.normal, ...style}} styleActive={{ ...styles.active, ...styleActive}}>
				<View style={styles.wrapper}>
					{src && <Image style={styles.image} src={src} />}
					{children && <Text style={textStyles}>{children}</Text>}
				</View>
			</Touchable>
		)
	}
}

module.exports = Button