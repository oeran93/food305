const React          = require('react')
const format         = require('../../../tools/format.js')
const globals        = require('../../../tools/globals.js')
const PropTypes      = require('prop-types')

const Meal = function(props) {
  let {meal, delivery, orders, toggleModal} = props
  let {_id, name, price, image, tags} = meal
  return (
    <div name={_id} className='col-sm-6 col-md-4 col-lg-3 meal'>
      <div className='thumbnail'>
        {orders && <span className='meal-orders'>{orders}</span>}
        <span className='label-success price pull-right'>
          {'$ '+(price+price*globals.sale_tax).toFixed(2)}
        </span>
        <img src={'images/meals/' + image} alt='Meal Picture' className='meal-picture'/>
        <div className='caption clearfix'>
          <h4 title={name} className='meal-name text-uppercase text-center'>
            {format.dotdotdot(name,25)}
          </h4>
          {delivery &&
            <span className='meal-delivery label pull-left col-xs-12'>
              {delivery.format('dddd Do, h a')} <br/> 5th Floor T. Rex
            </span>
          }
          {!delivery &&
            <button className="btn red-btn meal-btn" onClick={() => toggleModal('payment_modal', {open: true})}>
              Buy
            </button>
          }
        </div>
      </div>
    </div>
  )
}

Meal.propTypes = {
  meal: PropTypes.object.isRequired,
  delivery: PropTypes.object,
  orders: PropTypes.number,
  toggleModal: PropTypes.func
}

module.exports = Meal
