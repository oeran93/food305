const React = require('react')
const PropTypes = require('prop-types')

class Pay extends React.Component {

  pay () {
    let {amount, meal, date} = this.props
    $.ajax({
      method: "POST",
      url: "/buy_meal",
      data: {amount, meal, date},
      success: (res) => {
        if (res.error) confirmation.failure(res.error.message)
        else window.location.href = '/'
      }
    })
  }

  render () {
    return (
      <div className="row">
        <div className="col-xs-12 text-center text-uppercase">
          <h3>Checkout</h3>
        </div>
        <div className="col-xs-12 payment-info">
          <h4 className="alert alert-info known-card">
            <span className="fa fa-credit-card margin-right-5"></span>  Use credit card ending in {this.props.last_4_digits}
          </h4>
        </div>
        <div className='col-xs-12'>
          <button className='btn red-btn pull-right' onClick={this.pay.bind(this)}> Pay </button>
          <button className='btn red-btn pull-left' onClick={ () => this.props.change_step({step: 0})}> Back </button>
        </div>
      </div>
    )
  }
}

Pay.propTypes = {
  autofocus: PropTypes.bool,
  change_step: PropTypes.func.isRequired,
  amount: PropTypes.string,
  meal: PropTypes.object
}

module.exports = Pay
