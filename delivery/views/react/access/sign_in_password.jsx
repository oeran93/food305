const React        = require('react')
const $            = require('jquery')
const confirmation = require('../../../../tools/confirmation.js')()
const errors       = require('../../../../tools/errors.js')
const PropTypes    = require('prop-types')

class Sign_In_Password extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      pwd: "",
      confirmation_pwd: ""
    }
  }

  handle_change (event) {
    let state = this.state
    state[event.target.id] = event.target.value
    this.setState(state)
  }

  check_pwd () {
    let {change_step, phone} = this.props
    let {pwd, confirmation_pwd} = this.state
    if (pwd.length < 8) confirmation.failure(errors.short_pwd.message)
    else if (pwd != confirmation_pwd) confirmation.failure(errors.pwd_no_match.message)
    else {
      $.ajax({
        method: 'POST',
        url: '/create_password',
        data :{phone, pwd},
        success: (res) => {
          if (res.success) window.location.href = '/'
          else if (res.error) confirmation.failure(res.error.message)
        }
      })
    }
  }

  render () {
    let {pwd, confirmation_pwd} = this.state
    let {autofocus} = this.props
    return (
      <div className='row access'>
        <div className='col-xs-12 text-center text-uppercase'>
          <h3>Create a password</h3>
        </div>
        <div className="col-xs-12 input">
            <input
              autoFocus={autofocus}
              id="pwd"
              type="password"
              className="basic-input"
              placeholder="Password"
              value={pwd}
              onChange={this.handle_change.bind(this)}
              onKeyPress={(t) => {if (t.charCode === 13) this.check_pwd.bind(this)()}}
            />
        </div>
        <div className="col-xs-12 input">
            <input
              id="confirmation_pwd"
              type="password"
              className="basic-input"
              placeholder="Confirm Password"
              value={confirmation_pwd}
              onChange={this.handle_change.bind(this)}
              onKeyPress={(t) => {if (t.charCode === 13) this.check_pwd.bind(this)()}}
            />
        </div>
        <div className="col-xs-12">
          <button className='btn red-btn pull-right' onClick={this.check_pwd.bind(this)}>
            Done
          </button>
        </div>
      </div>
    )
  }


}

Sign_In_Password.propTypes = {
  change_step: PropTypes.func.isRequired,
  phone: PropTypes.string.isRequired,
  autofocus: PropTypes.bool
}

module.exports = Sign_In_Password
