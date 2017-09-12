const React        = require('react')
const PropTypes    = require('prop-types')
const Payment_Info = require('./payment_info.jsx')
const Pay          = require('./pay.jsx')

class Payment extends React.Component {

  constructor (props) {
    super(props)
  }

  render () {
    let {autofocus, product_info, last_4_digits, url, btn_text} = this.props
    return (
      <div className="row">
        <div className="col-xs-12">
          { last_4_digits
              ?
              <Pay
                product_info={product_info}
                last_4_digits={last_4_digits}
                url={url}
                btn_text={btn_text}
              />
              :
              <Payment_Info
                autofocus={autofocus}
                product_info={product_info}
                url={url}
                btn_text={btn_text}
              />
           }
        </div>
      </div>
    )
  }

}

Payment.propTypes = {
  last_4_digits: PropTypes.string,
  autofocus: PropTypes.bool,
  product_info: PropTypes.object,
  url: PropTypes.string,
  btn_text: PropTypes.string
}

Payment.defaultProps = {
  autofocus: true,
  btn_text: "Pay"
}

module.exports = Payment
