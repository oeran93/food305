var React = require('react')
var Modal = require('react-bootstrap').Modal
var $ = require('jquery')

var Actions = React.createClass({

	propTypes: {
		action: React.PropTypes.string.isRequired,
		addMeal: React.PropTypes.func
	},

	getDefaultProps: function () {	
		return {
			addMeal: () => {console.log('pass in a function')}
		}
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

	render: function() {
		var {action, addMeal} = this.props
		if (action === 'none') return
		return (
			<div>
				<p className='pull-right'>
	        {action === 'buy'
	        	&&
		        	<a 
				        className='btn btn-primary btn-outline' 
				        role='button' 
				        onClick={this.openDialog}>
				        Buy
				      </a>
	        }
	        {action === 'login'
	        	&&
	        		<a className='btn btn-primary btn-outline'
	        				role='button'
	        				onClick={() => window.location.href = '/auth/facebook'}>
	        				Sign up/in to buy
	        		</a>
	        }
	      </p>
	      <Modal
	  			show={this.state.open}
	  			onHide={this.closeDialog}
	  		>
	  			<Modal.Header closeButton>
	  				<Modal.Title>Do you want to buy this meal?</Modal.Title>
	  			</Modal.Header>
	  			<Modal.Body>
	          <p>
	          	This meal will <b>not be charged</b> to your card <b>untill 10am</b>. 
	          	It will be <b>delievered at 12:00 pm</b>.
	          	If more people buy it, you will pay less than its current price.
	          	Invite other people to get a bigger discount.
	          </p>
	        </Modal.Body>
	        <Modal.Footer>
	          <button className='btn btn-primary btn-outline' onClick={() => {
		          	addMeal() 
		          	this.closeDialog()
		          }}
	          >
	            Buy meal
	          </button>
	        </Modal.Footer>
	  		</Modal>
	  	</div>
		)
	}

})

module.exports = Actions