const React          = require('react')
const format         = require('../../../tools/format.js')
const generics        = require('../../../tools/generics.js')
const PropTypes      = require('prop-types')

const Meal = function(props) {
  let {meal, toggleModal} = props
  let {_id, name, price, image, tags, orders} = meal
  let real_price = generics.get_price_with_taxes(price)
  return (
    <div name={_id} className='col-sm-6 col-md-4 col-lg-3 meal'>
      <div className='thumbnail clearfix'>
        {orders.length > 0 && <span className='meal-orders'> {orders.length} </span>}
        <img src={'images/meals/' + image} alt={name} className='meal-picture'/>
        <div className='clearfix'>
          <h4 title={name} className='meal-name text-uppercase text-center'>
            {format.dotdotdot(name,25)}
          </h4>
          <button className="btn red-btn meal-btn pull-left" onClick={() => toggleModal('payment_modal', {open: true, meal: meal, amount:real_price})}>
            Buy
          </button>
          <span className='green-label price pull-right'> {'$ '+real_price} </span>
        </div>
      </div>
    </div>
  )
}

Meal.propTypes = {
  meal: PropTypes.object.isRequired,
  toggleModal: PropTypes.func
}

module.exports = Meal
