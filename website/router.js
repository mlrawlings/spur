var Profile = require('./components/profile')
  , EventResults = require('./components/event/event-results')
  , EventPage = require('./components/event/event-page')
  , NewEventForm = require('./components/event/new-event-form')
  , Four0Four = require('./components/404')
  , fb = require('../common/util/facebook')
  , kent = require('kent/router')
  , router = kent()
  , config = require('../common/config')
  , locationUtil = require('./util/location')

router.use(function(next) {

	this.document.title = 'Spur | Live in the Moment'

	this.document.links = [
		{ rel:'shortcut icon', href:'/favicon.ico' }
	]

	this.document.scripts = [
		'/scripts/ua-parser.min.js',
		'/scripts/outdated-browser.js',
		'/scripts/outdated-browser-init.js',
		'/scripts/alertify.js-0.3.11/lib/alertify.min.js',
		'https://cdnjs.cloudflare.com/ajax/libs/es6-promise/3.0.2/es6-promise.min.js',
		'https://cdnjs.cloudflare.com/ajax/libs/react/'+require('react').version+'/react-with-addons.min.js',
		{ src:'https://connect.facebook.net/en_US/sdk.js', async:true },
        'https://maps.google.com/maps/api/js?sensor=false&libraries=places',
		'/dist/client.js'
	]

	this.document.styles = [
		'https://fonts.googleapis.com/css?family=Open+Sans:400,300,700,600',
		'https://cdnjs.cloudflare.com/ajax/libs/normalize/3.0.3/normalize.min.css',
		'/styles/core.css',
		'/styles/outdatedbrowser.css',
		'/scripts/alertify.js-0.3.11/themes/alertify.core.css',
		'/scripts/alertify.js-0.3.11/themes/alertify.default.css'
	]

	this.document.meta = [
		{ name:'viewport', content:'width=device-width, initial-scale=1, maximum-scale=1' },
		{ property:'og:site_name', content:'Spur' },
		{ property:'fb:app_id', content:config.facebook.appId },
		{ property:'og:locale', content:'en_US' },
		{ property:'og:type', content:'article' }
	]

	next()
})

router.on('/profile/:id', function(next) {
	this.api.get('/users/'+this.params.id).then(profileUser => {
		this.render(Profile, { profileUser })
	}).catch((e) => {
		if(e.status == 404)
			this.render(Four0Four, {})

		next(e)
	})
})

router.on('/', function(next) {
	var radius = parseFloat(this.query.radius) || this.props.radius
	  , location = this.props.location && this.props.location.coords.join(',')

	if(radius != this.props.radius) {
		this.cookies.set('radius', radius)
		this.props.radius = radius
	}

	if(this.query.location) try {
		var newLocation = JSON.parse(this.query.location)
		location = newLocation.coords.join(',')
		this.props.location = newLocation
		this.cookies.set('location', this.query.location)
	} catch(e) {}

	if(location) {
		this.api.get('/events').query({ location, radius }).then(events => {
			this.render(EventResults, { events, radius, search:this.query.q })
		}).catch(function(err) {
			next(err)
		})
	} else {
		this.render(EventResults, { events:[], radius, search:this.query.q })
	}
		
})


router.on('/facebook/login', function(next) {
	if(__SERVER__) {
		this.req.session.facebookReferrer = this.req.header('Referrer')
		this.redirect("https://www.facebook.com/dialog/oauth?client_id="+config.facebook.appId+"&redirect_uri="+this.site+"/facebook/callback&response_type=code&scope=public_profile,email")
	}

	if(__BROWSER__) {
		FB.login(response => {
			if(response.status != 'connected') {
				return next(new Error('Login Failed...'))
			}

			this.api.post('/auth?access_token='+response.authResponse.accessToken).then(res => {
				window.user = res.user
				this.redirect(window.location.href)
			}).catch(next)
		}, {scope: 'public_profile,email'})
	}
})

router.on('/facebook/logout', function(next) {
	if(__SERVER__) {
		this.api.del('/auth').then(res => {
			this.redirect('https://www.facebook.com/logout.php?next='+encodeURIComponent(this.req.header('referrer'))+'&access_token='+this.req.session.token)
		})
	}

	if(__BROWSER__) {
		FB.logout(response => {
			if(response.status == 'connected') {
				return next(new Error('Logout Failed...'))
			}

			this.api.del('/auth').then(res => {
				window.user = undefined
				this.redirect(window.location.href)	
			}).catch(next)
		})
	}
})

if(__SERVER__) {
	router.on('/facebook/callback', function(next) {
		fb.get('/oauth/access_token').query({
			client_id: config.facebook.appId,
			redirect_uri: this.site+'/facebook/callback',
			client_secret: config.facebook.appSecret,
			code: this.req.query.code
		}).end((err, response) => {
			if(err) return next(err)
			
			this.api.post('/auth?'+response.text).then(() => {
				this.redirect(this.req.session.facebookReferrer)
			}).catch(next)
		})
	})
}

router.on('/event/:id', function(next) {
	this.api.get('/events/'+this.params.id).then(event => {
		//if(!event) return this.render(NotFound, {}, 404)

		this.document.title = event.name + ' | Spur'

		this.document.meta.push({ property:'og:image', content:locationUtil.getMapImageUrl(event.location) })
		this.document.meta.push({ property:'og:image:width', content:1200 })
		this.document.meta.push({ property:'og:image:height', content:630 })
		this.document.meta.push({ property:'og:title', content:event.name })
		this.document.meta.push({ property:'og:url', content:this.href })
		
		if(event.details)
			this.document.meta.push({ property:'og:description', content:event.details })

		this.render(EventPage, { event:event, currentURL:this.href })
	}).catch((e) => {
		if(e.status == 404)
			return this.render(Four0Four, {})

		next(e)
	})
})

router.on('/event/:id/invite', function(next) {
	if(__SERVER__) {
		if(/facebookexternalhit|facebot/.test(this.req.headers['user-agent'])) return this.redirect('/event/'+this.params.id)

		var now = new Date()
		  , oneYr = new Date()
		  , invitee = this.cookies.get('invitee') || Math.random()*99999999999999

		oneYr.setYear(now.getYear() + 1)

		if(!this.req.session.user)
			this.cookies.set('invitee', invitee, { expires: oneYr })
		else
			invitee = this.req.session.user.id
	}

	this.api.get('/events/'+this.params.id+'/invite/'+invitee).then(() => {
		
		this.redirect('/event/'+this.params.id)
	})
})

router.on('/event/:id/join', function(next) {
	this.api.post('/events/'+this.params.id+'/attendees').then(() => {
		this.redirect('/event/'+this.params.id)
	}).catch(next)
})

router.on('/event/:id/bail', function(next) {
	this.api.del('/events/'+this.params.id+'/attendees').then(() => {
		this.redirect('/event/'+this.params.id)
	}).catch(next)
})

router.on('/event/:id/cancel', function(next) {
	this.api.post('/events/'+this.params.id+'/cancel').send(this.body).then(() => {
		this.redirect('/event/'+this.params.id)
	}).catch(next)
})

router.on('/event/:id/uncancel', function(next) {
	this.api.post('/events/'+this.params.id+'/uncancel').send(this.body).then(() => {
		this.redirect('/event/'+this.params.id)
	}).catch(next)
})

router.on('/event/:id/post', function(next) {
	this.api.post('/events/'+this.params.id+'/posts').send(this.body).then(() => {
		this.redirect('/event/'+this.params.id)
	}).catch(next)
})

router.on('/event/:id/posts/:pid/comment', function(next) {
	this.api.post('/events/'+this.params.id+'/posts/'+this.params.pid+'/comments').send(this.body).then(() => {
		this.redirect('/event/'+this.params.id)
	}).catch(next)
})

router.on('/create/event', function(next) {
	var event = this.body

	if(!event || !event.name) return this.render(NewEventForm, {})

	if(event.location && event.location.coords) {
		if(event.location.coords[0]) event.location.coords[0] = parseFloat(event.location.coords[0])
		if(event.location.coords[1]) event.location.coords[1] = parseFloat(event.location.coords[1])
	}

	this.api.post('/events').send(event).then(eventId => {
		this.redirect('/event/'+eventId)
	}).catch(next)
})

module.exports = router