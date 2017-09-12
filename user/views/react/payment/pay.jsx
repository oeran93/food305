const React = require('react')
const PropTypes = require('prop-types')
const ajx = require('../../../../tools/ajax.js')()
import {Link} from 'react-router-dom'

class Pay extends React.Component {

  pay () {
    let {product_info, url} = this.props
    let {router} = this.context
    ajx.call({
      method: "POST",
      url: url,
      data: product_info,
      success: (res) => window.location.href = '/',
      redirect: router.history,
      show_messages: true,
      show_loading: true
    })
  }

  render () {
    let {btn_text, last_4_digits} = this.props
    return (
      <div className="row">
        <div className="col-xs-12 alert-info alert">
          <h4> <span className="fa fa-credit-card margin-right-5"></span>  Use credit card ending in {last_4_digits} </h4>
          <h5> <Link to="/profile">Change my default credit card</Link> </h5>
        </div>
        <div className='col-xs-12'>
          <button className='btn red-btn pull-right' onClick={this.pay.bind(this)}> {btn_text} </button>
        </div>
      </div>
    )
  }
}

Pay.contextTypes = {
  router: React.PropTypes.shape({
    history: React.PropTypes.object.isRequired,
  })
}

Pay.propTypes = {
  product_info: PropTypes.object,
  url: PropTypes.string.isRequired,
  last_4_digits: PropTypes.string.isRequired,
  btn_text: PropTypes.string
}

Pay.defaultProps = {
  btn_text: "Pay"
}

module.exports = Pay
