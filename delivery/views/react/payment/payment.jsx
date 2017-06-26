const React            = require('react')
const PropTypes        = require('prop-types')
const Payment_Info     = require('./payment_info.jsx')
const Pay = require('./pay.jsx')
const Price_Info = require('./price_info.jsx')
const date             = require('../../../../tools/date.js')()
const generics = require('../../../../tools/generics.js')

class Payment extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      station: ""
    }
  }

  componentWillMount () {
    $.ajax({
      method: "get",
      url: "/get_station",
      success: ({location}) => {
        this.setState({station: location})
      }
    })
  }

  change_step (info) {
    this.setState(info)
  }

  render () {
    let {autofocus, price, meal, user} = this.props
    let {station, step} = this.state
    let taxes_fees =  generics.get_taxes_fees(price)
    let total = Number(price) + Number(taxes_fees)
    let delivery = date.this_order_delivery()
    return (
      <div className="row">
        <div className="col-xs-12 text-center text-uppercase">
          <h3>Checkout</h3>
        </div>
        <div className="col-xs-12 alert alert-warning">
          <h4>
            <span className="fa fa-map-marker margin-right-5"></span> Pick up your food at {station}
          </h4>
          <h4>
            <span className="fa fa-calendar-o margin-right-5"></span> Your food will be delivered at {delivery.format('hh a')} on {delivery.format('dddd')}
          </h4>
        </div>
        <div className="col-xs-12 alert-success alert">
          <Price_Info
            price={price}
            taxes_fees={taxes_fees}
            total={total}
          />
        </div>
        <div className="col-xs-12">
          { user.last_4_digits
              ?
              <Pay
                change_step={this.change_step.bind(this)}
                total={total}
                meal={meal}
                date={delivery.format('MM-DD-YYYY hh:mm a')}
                last_4_digits={user.last_4_digits}
              />
              :
              <Payment_Info
                autofocus={autofocus}
                change_step={this.change_step.bind(this)}
                total={total}
                meal={meal}
                date={delivery.format('MM-DD-YYYY hh:mm a')}
              />
           }
        </div>
      </div>
    )
  }

}

Payment.propTypes = {
  user: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  autofocus: PropTypes.bool,
  amount: PropTypes.string,
  meal: PropTypes.object
}

Payment.defaultProps = {
  autofocus: true
}

module.exports = Payment