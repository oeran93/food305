const React          = require('react')
const format         = require('../../../tools/format.js')
const generics        = require('../../../tools/generics.js')
const PropTypes      = require('prop-types')
import {Modal} from 'react-bootstrap'
import Meal_Payment from './meal_payment.jsx'

class Meal extends React.Component {
  
  constructor (props) {
    super(props)
    this.state = {
      modal: {open: false}
    }
  }
  
  toggle_modal () {
    this.setState((old_state) => ({
      modal: {open: !old_state.modal.open}
    }))
  }
  
  render () {
    let {meal} = this.props
    let {_id, name, price, image, tags, orders, description} = meal
    let {modal} = this.state
    return (
      <div name={_id} className='col-sm-6 col-md-4 col-lg-3 meal'>
        <div className='thumbnail clearfix'>
          {orders.length > 0 && <span className='meal-orders'> {orders.length} </span>}
          <img src={'images/meals/' + image} alt={name} className='meal-picture'/>
          <div className='clearfix'>
            <h5 title={name} className='meal-name text-uppercase text-center'>
              {name}
            </h5>
            <p>{description}</p>
            <button className="btn red-btn meal-btn pull-left" onClick={this.toggle_modal.bind(this)}>
              Buy
            </button>
            <span className='green-label price pull-right'> {'$ '+price} </span>
          </div>
        </div>
        <Modal show={modal.open} onHide={this.toggle_modal.bind(this)}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <Meal_Payment autofocus={true} meal={meal}/>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

Meal.propTypes = {
  meal: PropTypes.object.isRequired
}

module.exports = Meal
