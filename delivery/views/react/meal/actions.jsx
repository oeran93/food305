const React = require('react')
const Modal = require('../modal.jsx')
const $     = require('jquery')
const ShareLinks = require('../shareLinks.jsx')
const date = require('../../../tools/date.js')

const Actions = React.createClass({

	propTypes: {
		_id: React.PropTypes.string.isRequired,
		action: React.PropTypes.string.isRequired, //use hidden to not show any action button
		addMeal: React.PropTypes.func
	},

	getInitialState: function () {
    return {
      open: false
    }
  },

  openDialog: function () {
    this.setState({open: true})
  },

  closeDialog: function () {
    this.setState({open: false})
  },

  chooseAction: function (action) {
  	let settings = []
  	switch (action) {
			case 'buy':
				settings = [this.openDialog, "Buy"]
				break
			case 'login':
				settings = [() => window.location.href = '/auth/facebook', "Sign up/in to buy"]
				break
		}
		return settings
  },

	render: function() {
		let {action, addMeal, _id} = this.props
		let [clickAction, linkText] = this.chooseAction(action)
		let time = date.timeUntilOrderClosed()
		let day = Math.trunc(time.asHours()) >= 10 ? 'tomorrow' : 'today'
		return (
			<div>
				<p className='pull-right'>
	        <a 
		        className={action +' btn btn-primary btn-outline'}
		        role='button' 
		        onClick={clickAction}>
		        {linkText}
		      </a>
	      </p>
	      <Modal
	      	open={this.state.open}
	      	close={this.closeDialog}
	      	action={addMeal}
	      	actionName="Buy Meal"
	      	title="Do you want to buy this meal?">
	      	<h4> 
	      		<span className='glyphicon glyphicon-credit-card'></span> Pay upon delivery
	      	</h4>
        	<h4>
        		<span className='glyphicon glyphicon-road'></span> Food will be <b> delievered at 12:00 pm {day} in Lopata </b>
        	</h4>
        	<h4> 
        		<span className='glyphicon glyphicon-fire'></span> As more people buy food, we keep lowering your price
        	</h4>
        	<h4>
        		<span className='glyphicon glyphicon-envelope'></span> Click <ShareLinks include={['facebook']} /> and invite your friends
        	</h4>
	      </Modal>
	  	</div>
		)
	}

})

module.exports = Actions