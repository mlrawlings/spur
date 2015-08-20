var React = require('react')
  , Layout = require('./layout')
  , EventList = require('./event-list')

module.exports = React.createClass({
  componentDidMount: function() {
  	console.log('mounted')
  },
  render: function() {
    return (
    	<Layout fbid={this.props.fbid}>
	    	<div className="page">
				<section className="hero">
					<div className="content">
						<h1><img src="/images/spur-text-white.png" alt="spur" /></h1>
						<h2>live in the moment</h2>
						<form action="/events" className="search">
							<input name="q" type="text" placeholder="what do you want to do?" />
							<button type="submit">
								<img src="/images/search-white.png" />
							</button>
						</form>
					</div>
				</section>
								
				<section className="about">
					<div className="content">
						<h3>what is spur?</h3>
						<p>Spur lets you post and find `moments`.  These moments are kind of like mini-events that are happening anywhere from right this second to 24 hours in the future.   And they can be just about anything: walking your dog, playing a game of halo, going for a run, or even a game of soccer.</p>
					</div>
				</section>

				<EventList events={this.props.events} />
			</div>
		</Layout>
	)
  }
})