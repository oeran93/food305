const React = require('react')
const PropTypes = require('prop-types')
const ajx = require('../../../../tools/ajax.js')()

class Pay extends React.Component {

  pay () {
    let {product_info, url} = this.props
    ajx.call({
      method: "POST",
      url: url,
      data: product_info,
      success: (res) => window.location.href = '/',
      show_messages: true,
      show_loading: true
    })
  }

  render () {
    return (
      <div className="row">
        <div className="col-xs-12 alert-info alert">
          <h4>
            <span className="fa fa-credit-card margin-right-5"></span>  Use credit card ending in {this.props.last_4_digits}
          </h4>
        </div>
        <div className='col-xs-12'>
          <button className='btn red-btn pull-right' onClick={this.pay.bind(this)}> Pay </button>
        </div>
      </div>
    )
  }
}

Pay.propTypes = {
  autofocus: PropTypes.bool,
  product_info: PropTypes.object,
  url: PropTypes.string.isRequired,
  last_4_digits: PropTypes.string.isRequired
}

module.exports = Pay
