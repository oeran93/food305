import React, { PropTypes } from 'react'
import errors from '../../../../tools/errors'
const confirmation = require('../../../../tools/confirmation.js')()

class Recover_Pwd extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      code: "",
      pwd: "",
      confirmation_pwd: ""
    }
  }

  handle_change (event) {
    let state = this.state
    state[event.target.id] = event.target.value
    this.setState(state)
  }

  change_password () {
    let {change_step, phone} = this.props
    let {code, pwd, confirmation_pwd} = this.state
    if (pwd.length < 8) confirmation.failure(errors.short_pwd.message)
    else if (pwd != confirmation_pwd) confirmation.failure(errors.pwd_no_match.message)
    else {
      $.ajax({
        method: 'POST',
        url: '/recover_pwd',
        data: {code, pwd, phone},
        success: (res) => {
          if (res.error) confirmation.failure(res.error.message)
          else {
            confirmation.success("Password successfully updated")
            change_step({step: 3})
          }
        }
      })
    }
  }

  render () {
    let {autofocus, change_step} = this.props
    let {code, pwd, confirmation_pwd} = this.state
    return (
      <div className='row access'>
        <div className='col-xs-12 text-center text-uppercase'>
          <h3>Change your password</h3>
        </div>
        <div className='col-xs-12 input'>
            <input
              autoFocus={autofocus}
              id="code"
              type="text"
              className="basic-input"
              value={code}
              placeholder="Code"
              onChange={this.handle_change.bind(this)}
              onKeyPress={(t) => {if (t.charCode === 13) this.change_password.bind(this)()}}
            />
        </div>
        <div className='col-xs-12 input'>
            <input
              id="pwd"
              type="password"
              className="basic-input"
              value={pwd}
              placeholder="New Password"
              onChange={this.handle_change.bind(this)}
              onKeyPress={(t) => {if (t.charCode === 13) this.change_password.bind(this)()}}
            />
        </div>
        <div className='col-xs-12 input'>
            <input
              id="confirmation_pwd"
              type="password"
              className="basic-input"
              value={confirmation_pwd}
              placeholder="Confirm Password"
              onChange={this.handle_change.bind(this)}
              onKeyPress={(t) => {if (t.charCode === 13) this.change_password.bind(this)()}}
            />
        </div>
        <div className='col-xs-12'>
          <button className='btn red-btn pull-left' onClick={() => change_step({step: 4})}>
            Send me another code
          </button>
          <button className='btn red-btn pull-right margin-right-5' onClick={this.change_password.bind(this)}>
            Next
          </button>
        </div>
      </div>
    )
  }

}

Recover_Pwd.propTypes = {
  change_step: PropTypes.func.isRequired,
  phone: PropTypes.string.isRequired,
  autofocus: PropTypes.bool
}

module.exports = Recover_Pwd
