import React, { PropTypes } from 'react'
import errors from '../../../../tools/errors'
const confirmation = require('../../../../tools/confirmation.js')()
const ajx = require('../../../../tools/ajax.js')()

class Change_Pwd extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      old_pwd: "",
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
    let {handle_change} = this.props
    let {old_pwd, pwd, confirmation_pwd} = this.state
    if (pwd.length < 8) confirmation.failure(errors.short_pwd.message)
    else if (pwd != confirmation_pwd) confirmation.failure(errors.pwd_no_match.message)
    else {
      ajx.call({
        method: 'POST',
        url: '/change_pwd',
        data: {old_pwd, pwd},
        success: (res) => handle_change(),
        success_message: "Password successfully updated",
        show_messages: true,
        show_loading: true
      })
    }
  }

  render () {
    let {autofocus, change_step} = this.props
    let {old_pwd, pwd, confirmation_pwd} = this.state
    return (
      <div className='row access'>
        <div className='col-xs-12 input'>
            <input
              autoFocus={autofocus}
              id="old_pwd"
              type="password"
              className="basic-input"
              value={old_pwd}
              placeholder="Old Password"
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
          <button className='btn red-btn pull-right margin-right-5' onClick={this.change_password.bind(this)}>
            Change Password
          </button>
        </div>
      </div>
    )
  }

}

Change_Pwd.propTypes = {
  handle_change: PropTypes.func,
  autofocus: PropTypes.bool
}

module.exports = Change_Pwd
