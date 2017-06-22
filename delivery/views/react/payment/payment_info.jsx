const React            = require('react')
const PropTypes        = require('prop-types')
const $ = require('jquery')
const confirmation = require('../../../../tools/confirmation.js')()

class Payment_Info extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      amount: "",
      credit_card: {
        card_number: "",
        cvv: "",
        type:"",
        exp_date: "",
        cardholder_name: ""
      },
      billing_address: {
        street: "",
        city: "",
        state_province: "",
        zip_postal_code: "",
        country: ""
      }
    }
  }

  credit_card_change (event) {
    let state = this.state
    state["credit_card"][event.target.id] = event.target.value
    this.setState(state)
  }

  billing_change (event) {
    let state = this.state
    state["billing_address"][event.target.id] = event.target.value
    this.setState(state)
  }

  pay () {
    $.ajax({
      method: "POST",
      url: "/charge_credit_card",
      data: this.state,
      success: (res) => {
        console.log(res)
        if (res.error) confirmation.failure(res.error.message)
      }
    })
  }

  render () {
    let {card_number, cvv, type, exp_date, cardholder_name} = this.state.credit_card
    //let {country, zip_postal_code, street, city, state_province} = this.state.billing_address
    return (
      <div className="row">
        <div className="col-xs-12 text-center text-uppercase">
          <h2>Payment Info</h2>
        </div>
        <div className="col-xs-12 credit-card-div">
          <div className="row">
            <div className ="col-xs-12">
              <input className="basic-input"
                     placeholder="Full name"
                     type="text"
                     id="cardholder_name"
                     value={cardholder_name}
                     onChange={this.credit_card_change.bind(this)}
                     onKeyPress={(t) => {if (t.charCode === 13) this.pay.bind(this)()}}
              />
            </div>
          </div>
          <div className="row">
            <div className ="col-xs-12">
              <input className="basic-input"
                     placeholder="Card Number"
                     type="text"
                     id="card_number"
                     value={card_number}
                     onChange={this.credit_card_change.bind(this)}
                     onKeyPress={(t) => {if (t.charCode === 13) this.pay.bind(this)()}}
              />
            </div>
          </div>
          <div className="row">
            <div className ="col-xs-12">
              <select id="type" className="basic-input" value={type} onChange={this.credit_card_change.bind(this)}>
                <option value="visa">Visa</option>
                <option value="mastercard">Mastercard</option>
                <option value="amex">American Express</option>
                <option value="diners">Diners Club</option>
                <option value="discover">Discover</option>
                <option value="jcb">JCB</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className ="col-xs-6">
              <input className="basic-input"
                     placeholder="MM/YY"
                     type="text"
                     id="exp_date"
                     value={exp_date}
                     onChange={this.credit_card_change.bind(this)}
                     onKeyPress={(t) => {if (t.charCode === 13) this.pay.bind(this)()}}
              />
            </div>
            <div className ="col-xs-6">
              <input className="basic-input"
                     placeholder="Security Code (CVC)"
                     type="text"
                     id="cvv"
                     value={cvv}
                     onChange={this.credit_card_change.bind(this)}
                     onKeyPress={(t) => {if (t.charCode === 13) this.pay.bind(this)()}}
              />
            </div>
          </div>
        </div>
        <div className="col-xs-12 text-center text-uppercase">
          <h2>Billing Info</h2>
        </div>
        <div className='col-xs-12'>
          <button className='btn red-btn pull-right' onClick={this.pay.bind(this)}> Pay </button>
          <button className='btn red-btn pull-left' onClick={ () => this.props.change_step({step: 0})}> Back </button>
        </div>
      </div>
    )
  }

}

Payment_Info.propTypes = {
  step: PropTypes.number,
  autofocus: PropTypes.bool,
  change_step: PropTypes.func.isRequired
}

Payment_Info.defaultProps = {
  step: 0,
  autofocus: true
}

module.exports = Payment_Info
