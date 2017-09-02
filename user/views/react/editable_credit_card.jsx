import React from 'react'
import PropTypes from 'prop-types'
import Payment_Info from './payment/payment_info.jsx'
const ajx = require('../../../tools/ajax.js')()
import _ from 'underscore'
class Editable_Credit_Card extends React.Component {
  
  constructor (props) {
    super(props)
    this.state = {
      editing: false
    }
  }
  
  delete_card () {
    if (confirm("Are you sure you want to delete this credit card?")) {
      ajx.call({
        method: "POST",
        url: "/delete_card",
        success: () => window.store.set('user.last_4_digits', "")
      })
    }
  }
  
  handle_change (credit_card) {
    window.store.set('user.last_4_digits', credit_card.number.slice(-4))
    this.setState({editing: false})
  }
  
  render () {
    let {name} = this.props
    let {editing} = this.state
    let {last_4_digits} = window.store.get('user')
    return (
      <div className="row">
          {editing && <Payment_Info always_save={true} btn_text="Add Card" handle_change={this.handle_change.bind(this)}/>}
          {!editing && last_4_digits &&
            <h3 className="col-xs-12">
              <div className="pull-left"><span className="label label-default"><span className="fa fa-credit-card"></span> {name}</span> {last_4_digits}</div>
              <div className="pull-right" onClick={this.delete_card.bind(this)}><span className="btn btn-danger"> Delete this card</span></div>
            </h3>
          }
          {!editing && !last_4_digits &&
            <h3 className="col-xs-12">
              <div className="pull-left"><span className="fa fa-credit-card"></span> No Card Saved</div>
              <div className="pull-right" onClick={() => this.setState.bind(this)({editing: true})}><span className="btn btn-info"> Add credit card </span></div>
            </h3>
          }
      </div>
    )
  }
  
}

Editable_Credit_Card.propTypes = {
  name: PropTypes.string
}

module.exports = Editable_Credit_Card