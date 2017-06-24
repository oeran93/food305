const React            = require('react')
const PropTypes        = require('prop-types')
const Pickup_Info      = require('./pickup_info.jsx')
const Payment_Info     = require('./payment_info.jsx')
const Pay = require('./pay.jsx')
const date             = require('../../../../tools/date.js')()

class Payment extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      station: "",
      step: this.props.step
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
    let {autofocus, amount, meal, user} = this.props
    let {station, step} = this.state
    let delivery = date.this_order_delivery()
    if (step == 0) {
      return (<Pickup_Info
                change_step={this.change_step.bind(this)}
                station={station}
                amount={amount}
                delivery_day={delivery.format('dddd')}
                delivery_hour={delivery.format('hh a')}
              />)
    } else if (step == 1 && !user.last_4_digits) {
      return (<Payment_Info
                autofocus={autofocus}
                change_step={this.change_step.bind(this)}
                amount={amount}
                meal={meal}
                date={delivery.format('MM-DD-YYYY hh:mm a')}
              />)
    } else if (step == 1 && user.last_4_digits) {
      return (<Pay
                change_step={this.change_step.bind(this)}
                amount={amount}
                meal={meal}
                date={delivery.format('MM-DD-YYYY hh:mm a')}
                last_4_digits={user.last_4_digits}
              />)
    }
  }

}

Payment.propTypes = {
  user: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  step: PropTypes.number,
  autofocus: PropTypes.bool,
  amount: PropTypes.string,
  meal: PropTypes.object
}

Payment.defaultProps = {
  step: 0,
  autofocus: true
}

module.exports = Payment
