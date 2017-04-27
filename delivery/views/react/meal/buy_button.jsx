const React        = require('react')
const date         = require('../../../../tools/date.js')()
const confirmation = require('../../../../tools/confirmation.js')()
const Modal        = require('../modal.jsx')
const PropTypes    = require('prop-types')

class Buy_Button extends React.Component {

	constructor (props) {
		super(props)
		this.state = {
      open: false
    }
	}

	open_dialog () {
    this.setState({open: true})
  }

  close_dialog () {
    this.setState({open: false})
  }

  buy_meal () {
    let delivery = date.this_order_delivery()
    $.ajax({
      method: 'POST',
      url: '/post_order',
      data: {meal: this.props._id, date: delivery.format('MMM DD YYYY, hh')},
      success: () => confirmation.success('Sit back and relax, your meal will be delivered on '+delivery.format('dddd Do, hh a')),
      error: () => confirmation.failure('Something went wrong :(')
    })
    this.close_dialog()
  }

	render () {
		let {_id} = this.props
    let {open} = this.state
    let delivery = date.this_order_delivery()
		return (
			<div>
				<span className='pull-right'>
	        <a
		        className='btn red-btn'
		        role='button'
		        onClick={this.open_dialog.bind(this)}>
		        Buy
		      </a>
	      </span>
	      <Modal
	      	open={open}
	      	close={this.close_dialog.bind(this)}
	      	action={this.buy_meal.bind(this)}
	      	action_name="Buy Meal"
	      	title={"Food will be delievered on " + delivery.format('dddd Do, hh a') + " in Lopata"}
        >
	      </Modal>
	  	</div>
		)
	}

}

Buy_Button.propTypes = {
	_id: PropTypes.string.isRequired
}

module.exports = Buy_Button
