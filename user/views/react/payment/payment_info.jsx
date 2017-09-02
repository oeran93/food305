const React            = require('react')
const PropTypes        = require('prop-types')
const $ = require('jquery')
const _ = require('underscore')
const date         = require('../../../../tools/date.js')()
const ajx = require('../../../../tools/ajax.js')()

class Payment_Info extends React.Component {

  constructor (props) {
    super(props)
    this.state = _.extend({
      save_info: true,
      credit_card: {
        number: "",
        cvc: "",
        exp_month: "",
        exp_year: "",
        name: ""
      }
    }, props.product_info)
  }

  credit_card_change (event) {
    let state = this.state
    state["credit_card"][event.target.id] = event.target.value
    this.setState(state)
  }
  
  save_info (event) {
    this.setState((prevState) => ({
      save_info: !prevState.save_info
    }))
  }

  pay () {
    const {save_info} = this.state
    const {always_save, url} = this.props
    if (save_info || always_save) this.add_card.bind(this)()
    if (url) {
      ajx.call({
        method: "POST",
        url: url,
        data: this.state,
        success: (res) => window.location.href = '/',
        show_messages: true,
        show_loading: true
      })
    }
    this.props.handle_change(this.state.credit_card)
  }
  
  add_card () {
    ajx.call({
      method: "POST",
      url: '/add_card',
      data: this.state,
      show_messages: true,
      show_loading: true
    })
  }

  render () {
    let {number, cvc, type, exp_month, exp_year, name} = this.state.credit_card
    let {save_info} = this.state
    let {autofocus, btn_text, always_save} = this.props
    return (
      <div className="row">
        <div className="col-xs-12 credit-card-div">
          <div className="row">
            <div className ="col-xs-12">
              <input className="basic-input"
                     placeholder="Name on card"
                     type="text"
                     id="name"
                     value={name}
                     onChange={this.credit_card_change.bind(this)}
                     onKeyPress={(t) => {if (t.charCode === 13) this.pay.bind(this)()}}
                     autoFocus={autofocus}
              />
            </div>
          </div>
          <div className="row">
            <div className ="col-xs-12">
              <input className="basic-input"
                     placeholder="Card Number"
                     type="text"
                     id="number"
                     value={number}
                     onChange={this.credit_card_change.bind(this)}
                     onKeyPress={(t) => {if (t.charCode === 13) this.pay.bind(this)()}}
              />
            </div>
          </div>
          <div className="row">
            <div className ="col-xs-4">
              <input className="basic-input"
                     placeholder="MM"
                     type="text"
                     id="exp_month"
                     value={exp_month}
                     onChange={this.credit_card_change.bind(this)}
                     onKeyPress={(t) => {if (t.charCode === 13) this.pay.bind(this)()}}
              />
            </div>
            <div className ="col-xs-4">
              <input className="basic-input"
                     placeholder="YY"
                     type="text"
                     id="exp_year"
                     value={exp_year}
                     onChange={this.credit_card_change.bind(this)}
                     onKeyPress={(t) => {if (t.charCode === 13) this.pay.bind(this)()}}
              />
            </div>
            <div className ="col-xs-4">
              <input className="basic-input"
                     placeholder="Security Code (CVC)"
                     type="text"
                     id="cvc"
                     value={cvc}
                     onChange={this.credit_card_change.bind(this)}
                     onKeyPress={(t) => {if (t.charCode === 13) this.pay.bind(this)()}}
              />
            </div>
          </div>
          {!always_save &&
            <div className="row">
              <div className="col-xs-12">
                <h5><input type="checkbox" onChange={this.save_info.bind(this)} checked={save_info}/> Save my credit card for fast checkout</h5>
              </div>
            </div>
          }
        </div>
        <div className='col-xs-12'>
          <button className='btn red-btn pull-right' onClick={this.pay.bind(this)}> {btn_text} </button>
        </div>
      </div>
    )
  }

}

Payment_Info.propTypes = {
  autofocus: PropTypes.bool,
  product_info: PropTypes.object,
  url: PropTypes.string,
  btn_text: PropTypes.string,
  always_save: PropTypes.bool,
  handle_change: PropTypes.func
}

Payment_Info.defaultProps = {
  autofocus: true,
  btn_text: "Pay",
  handle_change: () => {}
}

module.exports = Payment_Info
