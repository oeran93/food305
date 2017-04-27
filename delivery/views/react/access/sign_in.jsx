const React        = require('react')
const Modal        = require('../modal.jsx')
const $            = require('jquery')
const confirmation = require('../../../../tools/confirmation.js')()
const errors       = require('../../../../tools/errors.js')
const PropTypes    = require('prop-types')

class Sign_In extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      open: true,
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
    let {phone, pwd, open} = this.state
    let {change_step, close} = this.props
    return (
      <Modal
        open = {open}
        close = {close}
        title = "Login"
        action = {this.login.bind(this)}
        action_name = "Login"
      >
        <div className='row'>
        <div className='col-xs-12 col-sm-10 col-sm-offset-1'>
          <div className="input-group input-group-lg">
            <span className="input-group-addon">Phone</span>
            <input id="phone" type="text" className="form-control" value={phone} onChange={this.handle_change.bind(this)} />
          </div>
          <div className="input-group input-group-lg big-top-space big-bottom-space">
            <span className="input-group-addon">Password</span>
            <input id="pwd" type="password" className="form-control" value={pwd} onChange={this.handle_change.bind(this)} />
          </div>
          <a href='#' className='red-text text-centered' onClick={() => change_step(0)}> Create an account </a>
        </div>
        </div>
      </Modal>
    )
  }

}

Sign_In.propTypes = {
  change_step: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired
}
module.exports = Sign_In
