var React = require('react')
  , Button = require('../../core/button')
  , View = require('../../core/view')
  , Input = require('../../core/input')
  , Form = require('../../core/form')
  , scroll = __BROWSER__ && require('scroll')

var styles = {}

styles.form = {
	marginBottom: 30,
	alignItems: 'flex-end',
	borderWidth:1,
	borderColor:'#ddd'
}
styles.message = {
	borderWidth: 0,
	width: '100%',
	padding: 10,
	backgroundColor: '#fff',
	minHeight: 60,
	resize:'none'
}
styles.bar = {
	padding: 5,
	width: '100%',
	backgroundColor: '#f4f4f4',
	alignItems: 'flex-end'
}
styles.buttonDisabled = {
	opacity:0.5,
	backgroundColor:'#999'
}

class PostForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			hasValue:false
		}
	}
	onKeyDown(e) {
		var message = React.findDOMNode(this.refs.message)
		setTimeout(() => this.setState({ hasValue:!!message.value }))
	}
	submitPost(e) {
		var message = React.findDOMNode(this.refs.message)
		  , form = React.findDOMNode(this.refs.form)
		
		if(React.findDOMNode(this.refs.message).value) {
			this.setState({ loading:true })
			app.submit(form).then(() => {
				var distance = form.getBoundingClientRect().bottom
				scroll.top(document.body, window.scrollY+distance, { duration:Math.abs(distance) })
				form.reset()
				this.setState({ hasValue:false, loading:false })
			})
		}

		e.preventDefault()
	}
	render() {
		var { event, user } = this.props
		  , { hasValue, loading } = this.state

		if(!user) return false

		return (
			<Form ref="form" style={styles.form} action={'/event/'+event.id+'/post'}>
				<Input type="textarea" ref="message" style={styles.message} name="message" placeholder="Write something..." onKeyDown={this.onKeyDown.bind(this)} />
				<View style={styles.bar}>
					<Button loading={loading} style={hasValue ? styles.buttonActive : styles.buttonDisabled} src="/images/post.png" onClick={this.submitPost.bind(this)} type="submit">Post</Button>
				</View>
			</Form>
		)
	}
}

module.exports = PostForm