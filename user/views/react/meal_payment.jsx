const React        = require('react')
const PropTypes    = require('prop-types')
const Payment = require('./payment/payment.jsx')
const Tooltip      = require('./tooltip.jsx')
const date         = require('../../../tools/date.js')()
const generics     = require('../../../tools/generics.js')
const ajx          = require('../../../tools/ajax.js')()

class MealPayment extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      station: "",
      promotion: null
    }
  }

  componentWillMount () {
    ajx.call({
      method: "get",
      url: "/get_station",
      success: ({location}) => this.setState({station: location}),
      show_loading: true
    })
    ajx.call({
      method: "get",
      url: "/get_meal_promotion",
      success: (promotion) => this.setState({promotion}),
    })
  }

  render () {
    let {autofocus, meal} = this.props
    let {station,promotion} = this.state
    let taxes_fees =  generics.get_taxes_fees(meal.price)
    let price = meal.price
    let discounted_price = promotion ? (price - (price * promotion.discount)).toFixed(2) : null
    let total = ((discounted_price ? Number(discounted_price) : Number(price)) + Number(taxes_fees)).toFixed(2)
    let delivery = date.this_order_delivery()
    let user = window.store.get('user')
    return (
      <div className="row">
        <div className="col-xs-12 text-center text-uppercase">
          <h3 className="margin-top-0">Checkout</h3>
        </div>
        <div className="col-xs-12 alert-success alert">
            <div className="row">
              <div className="col-xs-12">
                {promotion && <h4>You are getting a {promotion.discount * 100}% discount: <del className="margin-right-5">${price}</del> <b>${discounted_price}</b> </h4>}
                {!promotion && <h4>Price: $ {price} - Same price as the restaurant</h4>}
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12">
                <h4 className="green-label">Delivery: FREE </h4>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12">
                <h4>Taxes & Fees: ${taxes_fees} <Tooltip tooltip="Restaurant Sales taxes (about 10%). Credit Card fees, 2.9% + $ 0.30">
                      <span className="fa fa-question-circle-o"></span>
                  </Tooltip>
                </h4>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12">
                <h4 className="green-label">Total: <b> ${total} </b> </h4>
              </div>
            </div>
        </div>
        <div className="col-xs-12">
          <Payment 
              url="/buy_meal"
              product_info={{meal:meal}}
              last_4_digits={user.last_4_digits}
          />
        </div>
      </div>
    )
  }

}

MealPayment.propTypes = {
  autofocus: PropTypes.bool,
  meal: PropTypes.object,
}

MealPayment.defaultProps = {
  autofocus: true
}

module.exports = MealPayment
