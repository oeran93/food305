const React        = require('react')
const date         = require('../../../../tools/date.js')()
const confirmation = require('../../../../tools/confirmation.js')()
const Modal        = require('../modal.jsx')

module.exports = React.createClass({

	propTypes: {
		_id: React.PropTypes.string.isRequired
	},

	getInitialState: function () {
    return {
      open: false,
      checked: false,
      error_checked: false
    }
  },

  open_dialog: function () {
    this.setState({open: true})
  },

  close_dialog: function () {
    this.setState({open: false})
  },

  check: function () {
    this.setState((state) => ({checked: !state.checked}))
  },  

  buy_meal: function () {
    if (!this.state.checked) {
      this.setState({error_checked: true})
      return
    }
    $.ajax({
      method: 'POST',
      url: '/post_order',
      data: {meal: this.props._id, date: date.this_order_delivery().format('MMM DD YYYY, hh')},
      success: () => confirmation.success('Sit back and relax, your meal will be delivered at 12:00 pm'),
      error: () => confirmation.failure('Something went wrong :(')
    })
    this.close_dialog()
  },

	render: function() {
		let {_id} = this.props
    let {open, checked, error_checked} = this.state
    let delivery = date.this_order_delivery()
		return (
			<div>
				<span className='pull-left'>
	        <a 
		        className='btn red-btn'
		        role='button' 
		        onClick={this.open_dialog}>
		        Buy
		      </a>
	      </span>
	      <Modal
	      	open={open}
	      	close={this.close_dialog}
	      	action={this.buy_meal}
	      	action_name="Buy Meal"
	      	title={"Food will be delievered on " + delivery.format('dddd Do, hh a') + " in Lopata"}  
        >
          <h3>
            <span className='glyphicon glyphicon-credit-card'></span> Pay upon delivery
          </h3>
          <h5 style={error_checked ? {color: 'red'} : {}}>
            <input 
              type="radio" 
              name="address"   
              checked={checked} 
              onChange={this.check} 
            /> By pressing "Buy Meal" you are purchasing the selected meal. <b> You will not be able to cancel your order </b>
          </h5>
	      </Modal>
	  	</div>
		)
	}

})