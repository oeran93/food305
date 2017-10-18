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
  
  getIcon (tag) {
    return ({
      Vegetarian: 'leaf',
      Spicy: 'fire'
    })[tag]
  }
  
  render () {
    let {meal} = this.props
    let {_id, name, price, image, tags, orders, description} = meal
    let {modal} = this.state
    return (
      <div name={_id} className='col-xs-12 col-sm-4 meal'>
        <div className='thumbnail clearfix meal-thumbnail'>
          {orders.length > 0 && <span className='meal-orders'> {orders.length} </span>}
          <span className='label label-default meal-price'> {'$ '+price} </span>
          <img src={'images/meals/' + image} alt={name} className='meal-picture'/>
          <div className='clearfix'>
            <h5 title={name} className='meal-name text-center'>
              {name} {tags.map(tag => <span title={tag} className={`fa fa-${this.getIcon(tag)} margin-right-5`}></span>)}
            </h5>
            <p className="meal-description">{description}</p>
            <button className="btn red-btn meal-btn pull-right" onClick={this.toggle_modal.bind(this)}>
              Buy
            </button>
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
