const React       = require('react')
const Modal       = require('../modal.jsx')
const $           = require('jquery')
const Share_Links = require('../share_links.jsx')
const date        = require('../../../../tools/date.js')

module.exports = React.createClass({

	propTypes: {
		_id: React.PropTypes.string.isRequired,
		action: React.PropTypes.string.isRequired, //use hidden to not show any action button
		add_meal: React.PropTypes.func
	},

	getInitialState: function () {
    return {
      open: false
    }
  },

  open_dialog: function () {
    this.setState({open: true})
  },

  close_dialog: function () {
    this.setState({open: false})
  },

  choose_action: function (action) {
  	let settings = []
  	switch (action) {
			case 'buy':
				settings = [this.open_dialog, "Buy"]
				break
			case 'login':
				settings = [() => window.location.href = '/auth/facebook', "Sign up/in to buy"]
				break
		}
		return settings
  },

	render: function() {
		let {action, add_meal, _id} = this.props
		let [click_action, link_text] = this.choose_action(action)
		let time = date.time_until_order_closed()
		let day = Math.trunc(time.asHours()) >= 10 ? 'tomorrow' : 'today'
		return (
			<div>
				<span className='pull-left'>
	        <a 
		        className={action +' btn btn-primary btn-outline'}
		        role='button' 
		        onClick={click_action}>
		        {link_text}
		      </a>
	      </span>
	      <Modal
	      	open={this.state.open}
	      	close={this.close_dialog}
	      	action={add_meal}
	      	action_name="Buy Meal"
	      	title="Do you want to buy this meal?">
	      	<h4>
	      		<span className='glyphicon glyphicon-credit-card'></span> Pay upon delivery
	      	</h4>
        	<h4>
        		<span className='glyphicon glyphicon-road'></span> Food will be <b> delievered at 12:00 pm {day} in Lopata </b>
        	</h4>
        	<h4>
        		<span className='glyphicon glyphicon-envelope'></span> Click <Share_Links include={['facebook']} /> and invite your friends
        	</h4>
	      </Modal>
	  	</div>
		)
	}

})