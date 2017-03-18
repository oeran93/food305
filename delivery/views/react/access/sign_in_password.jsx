const React = require('react')
const Modal = require('../modal.jsx')
const $ = require('jquery')
const confirmation = require('../../../../tools/confirmation.js')()

module.exports = React.createClass({

  propTypes: {
    change_step: React.PropTypes.func.isRequired,
    phone: React.PropTypes.string.isRequired,
    close: React.PropTypes.func.isRequired
  },

  getInitialState: function () {
    return {
      open: true,
      pwd: "",
      confirmation_pwd: ""
    }
  },

  close: function () {
    this.setState({open: false})
  },

  handle_change: function (event) {
    let state = this.state
    state[event.target.id] = event.target.value
    this.setState(state)
  },

  send_pwd: function () {
    let {change_step, phone} = this.props
    let {pwd, confirmation_pwd} = this.state
    if (pwd.length < 8) {
      confirmation.failure('Password must be at least 8 characters long')
      return
    }else if (pwd != confirmation_pwd) {
      confirmation.failure('Password do not match')
      return
    } 
    $.ajax({
      method: 'POST',
      url: '/create_password',
      data :{phone, pwd},
      success: (res) => {
        if (res.error) {
          confirmation.failure('Invalid password')
        } else if (res.success) window.location.href = '/'
      }
    })
  },

  render: function() {
    let {pwd, confirmation_pwd, open} = this.state
    let {close} = this.props
    return (
      <Modal
        open = {open}
        close = {close}
        title = "Create a password"
        action = {this.send_pwd}
        action_name = "Done"
      >
        <div className='row'>
        <div className='col-xs-12 col-sm-10 col-sm-offset-1'>
          <div className="input-group input-group-lg">
            <span className="input-group-addon">Password</span>
            <input id="pwd" type="password" className="form-control" value={pwd} onChange={this.handle_change} />
          </div>
          <div className="input-group input-group-lg big-top-space">
            <span className="input-group-addon">Confirmation</span>
            <input id="confirmation_pwd" type="password" className="form-control" value={confirmation_pwd} onChange={this.handle_change} />
          </div>
        </div>
        </div>
      </Modal>
    )
  }

})