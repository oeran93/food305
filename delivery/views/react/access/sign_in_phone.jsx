const React = require('react')
const Modal = require('../modal.jsx')
const $ = require('jquery')
const confirmation = require('../../../../tools/confirmation.js')()

module.exports = React.createClass({

  propTypes: {
    change_step: React.PropTypes.func.isRequired,
    close: React.PropTypes.func.isRequired
  },

  getInitialState: function () {
    return {
      open: true,
      phone: ""
    }
  },

  handle_change: function (event) {
    let state = this.state
    state[event.target.id] = event.target.value
    this.setState(state)
  },

  send_phone: function () {
    let {change_step} = this.props
    let {phone} = this.state
    $.ajax({
      method: 'POST',
      url: '/create_user',
      data :{phone},
      success: (res) => {
        if (res.error) {
          confirmation.failure('Invalid phone number')
        } else if(res.success) change_step(1,phone)
      }
    })
  },

  render: function() {
    let {phone} = this.state
    let {close} = this.props
    return (
      <Modal
        open = {open}
        close = {close}
        title = "Welcome to our community"
        action = {this.send_phone}
        action_name = "Next"
      >
        <div className='row'>
        <div className='col-xs-12 col-sm-10 col-sm-offset-1'>
          <div className="input-group input-group-lg">
            <span className="input-group-addon">Phone</span>
            <input id="phone" type="text" className="form-control" value={phone} onChange={this.handle_change} />
          </div>
        </div>
        </div>
      </Modal>
    )
  }

})