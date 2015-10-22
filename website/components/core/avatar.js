const DEFAULT_SIZE = 36

var React = require('react')
  , Image = require('./image')
  , View = require('./view')
  , Text = require('./text')
  , ColorHash = require('color-hash')
  , colors = new ColorHash({ hash })

function hash(str) {
    var hash = 0
    for(var i = 0; i < str.length; i++) {
        hash = hash*11 + str.charCodeAt(i)
    }
    return hash
}

var styles = {}

styles.avatar = {
	borderRadius:4,
	justifyContent:'center',
	alignItems:'center'
}

styles.avatarLetter = {
	color:'#fff',
	fontWeight:300
}

class Avatar extends React.Component {
	getImageUrl(user, size) {
		if(user && user.fbid) {
			return `https://graph.facebook.com/v2.3/${user.fbid}/picture?width=${size}&height=${size}`
		}
	}
	render() {
		var { user, style, size, ...props } = this.props
		  , dim = size || (style && (style.width || style.height)) || DEFAULT_SIZE
		  , src = this.getImageUrl(user, dim)
		  , color = !src && (user ? colors.hex(user.id) : '#808080')
		  , fontSize = Math.floor(dim*0.6)

		return src ? (
			<Image src={src} style={{ ...styles.avatar, width:dim, height:dim, ...style }} {...props} />
		) : (
			<View style={{ ...styles.avatar, width:dim, height:dim, backgroundColor:color, ...style }} {...props}>
				<Text style={{ ...styles.avatarLetter, fontSize:fontSize }}>
					{user ? user.name.first.slice(0, 1).toUpperCase() : '?'}
				</Text>
			</View>
		)
	}
}

module.exports = Avatar