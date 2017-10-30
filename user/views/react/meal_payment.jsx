const React        = require('react')
const PropTypes    = require('prop-types')
const Payment = require('./payment/payment.jsx')
const Tooltip      = require('./tooltip.jsx')
const date         = require('../../../tools/date.js')()
const generics     = require('../../../tools/generics.js')
const ajx          = require('../../../tools/ajax.js')()
const cookies       = require('../../../tools/cookies.js')

class MealPayment extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      step: this.props.step,
      station: "",
      promotion: null,
      feedback:"",
      response:""
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
  
  positive_feedback () {
    cookies.set_cookie("feedback", 1, 30)
    ajx.call({
      method: "post",
      url: "/send_feedback",
      data: {feedback: this.state.feedback, response: 'yes'},
      success: () => this.setState({step: 1}),
    })
  }

  negative_feedback () {
    cookies.set_cookie("feedback", 1, 30)
    ajx.call({
      method: "post",
      url: "/send_feedback",
      data: {feedback: this.state.feedback, response: 'no'},
      success: () => this.setState({step: 1}),
    })
  }
  
  render () {
    let {autofocus, meal} = this.props
    let {station,promotion,step} = this.state
    let taxes_fees =  generics.get_taxes_fees(meal.price)
    let price = meal.price
    let discounted_price = promotion ? (price - (price * promotion.discount)).toFixed(2) : null
    let total = ((discounted_price ? Number(discounted_price) : Number(price)) + Number(taxes_fees)).toFixed(2)
    let delivery = date.this_order_delivery()
    let user = window.store.get('user')
    return (<div>
      {step == 0 && 
        <div className="row">
          <div className="col-xs-12 text-center text-uppercase">
            <h3 className="margin-top-0">One thing before you buy</h3>
          </div>
          <div className="col-xs-12">
              <div className="row">
                <div className="col-xs-12">
                  <p>This will be the last week Vimi serves food at T-Rex for the foreseeable future. 
                  We would like to thank you for supporting our company and helping us improve our service. 
                  Special thanks to Kathleen and T-Rex for giving us space to operate! 
                  We will be ending our testing phase and begin serving larger businesses that make our model financially feasible. 
                  <br/>Thanks again for your help!</p>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">
                    <h3 className="text-center">Any last minute feedback?</h3>
                    <textarea placeholder="What did you like/dislike about Vimi?" rows="4" 
                              style={{resize:'none'}} className="form-control" 
                              onChange={(e) => this.setState({feedback: e.target.value})}>
                    </textarea>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">
                  <h3 className="text-center">Would you have subscribed ?</h3>
                  <p>If Vimi stayed at T-Rex for a longer period of time, would you have subscribed for $9.99 a month? (We need your honest answer!)</p>
                  <br/>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">
                  <button className='btn red-btn pull-right' onClick={this.positive_feedback.bind(this)}>
                    Yes, I would
                  </button>
                  <button className='btn red-btn pull-right' onClick={this.negative_feedback.bind(this)}>
                    No, I would not
                  </button>
                </div>
              </div>
          </div>
        </div>
      }
      {step == 1 &&
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
      }
    </div>)
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
