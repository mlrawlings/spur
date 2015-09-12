var React = require('react')
  , Touchable = require('./touchable')
  , Image = require('./image')
  , Text = require('./text')

var styles = {}

styles.normal = {
	fontFamily: 'Open Sans, sans-serif',
	fontWeight: 600,
	fontSize: 14,
	textAlign: 'center',
	color:'#fff',

	padding:8,
	paddingBottom:5,
	borderWidth: 0,
	borderBottomWidth: 3,
	borderRadius: 4,

	backgroundColor: '#04beca',
	borderBottomColor:'rgba(0,0,0,0.2)',

	flexDirection:'row',

	textDecoration: 'none',
	cursor:'pointer'
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
	flex:1,
	paddingLeft:6,
	paddingRight:6
}

styles.textWithIcon = {
	flex:1,
	paddingLeft:6,
	paddingRight:6,
	marginLeft:8
}

class Button extends React.Component {
	render() {
		var { style, styleActive, src, children, ...props } = this.props
		  , tag = this.props.href ? 'a' : 'button'

		return (
			<Touchable tag={tag} {...props} style={{ ...styles.normal, ...style}} styleActive={{ ...styles.active, ...styleActive}}>
				{src && <Image style={styles.image} src={src} />}
				{children && <Text style={src ? styles.textWithIcon : styles.text}>{children}</Text>}
			</Touchable>
		)
	}
}

module.exports = Button