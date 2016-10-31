var React = require('react')
var Modal = require('react-bootstrap').Modal

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
	      </p>
	      <Modal
	  			show={this.state.open}
	  			onHide={this.closeDialog}
	  		>
	  			<Modal.Header closeButton>
	  				<Modal.Title>Almost yours!</Modal.Title>
	  			</Modal.Header>
	  			<Modal.Body>
	          <p>Once you buy this meal.. blah blah blah</p>
	        </Modal.Body>
	        <Modal.Footer>
	          <button className='btn btn-primary btn-outline' onClick={() => {
		          	addMeal() 
		          	this.closeDialog()
		          }}
	          >
	            Buy
	          </button>
	        </Modal.Footer>
	  		</Modal>
	  	</div>
		)
	}

})

module.exports = Actions