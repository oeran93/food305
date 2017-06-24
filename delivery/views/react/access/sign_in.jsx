const React        = require('react')
const $            = require('jquery')
const confirmation = require('../../../../tools/confirmation.js')()
const errors       = require('../../../../tools/errors.js')
const PropTypes    = require('prop-types')

class Sign_In extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      phone: "",
      pwd: ""
    }
  }

  handle_change (event) {
    let state = this.state
    state[event.target.id] = event.target.value
    this.setState(state)
  }

  login () {
    let {change_step} = this.props
    let {phone, pwd} = this.state
    $.ajax({
      method: 'POST',
      url: '/login',
      data :{phone, pwd},
      success: (res) => {
        if (res.success) window.location.href = '/'
        else if (res.error.number == errors.user_not_active.number) change_step(1)
        else confirmation.failure(res.error.message)
      }
    })
  }

  render () {
    let {phone, pwd} = this.state
    let {change_step, autofocus} = this.props
    return (
      <div className='row access'>
        <div className='col-xs-12 text-center text-uppercase'>
          <h3>SIGN IN</h3>
        </div>
        <div className='col-xs-12 input'>
          <input
            autoFocus={autofocus}
            id="phone" type="text"
            className="basic-input"
            placeholder="Phone"
            value={phone}
            onChange={this.handle_change.bind(this)}
            onKeyPress={(t) => {if (t.charCode === 13) this.login.bind(this)()}}
          />
        </div>
        <div className="col-xs-12 input">
          <input
            id="pwd"
            type="password"
            className="basic-input"
            placeholder="Password"
            value={pwd}
            onChange={this.handle_change.bind(this)}
            onKeyPress={(t) => {if (t.charCode === 13) this.login.bind(this)()}}
          />
        </div>
        <div className="col-xs-12">
          <button className='btn red-btn pull-left' onClick={() => change_step(4)}>
            Forgot Password
          </button>
          <button className='btn red-btn pull-left' onClick={() => change_step(0)}>
            Create an account
          </button>
          <button className='btn red-btn pull-right' onClick={this.login.bind(this)}>
            Login
          </button>
        </div>
      </div>
    )
  }

}

Sign_In.propTypes = {
  change_step: PropTypes.func.isRequired,
  autofocus: PropTypes.bool
}
module.exports = Sign_In
