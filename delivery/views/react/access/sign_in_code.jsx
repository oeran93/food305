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
      code: ""
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

  send_code: function () {
    let {change_step,phone} = this.props
    let {code} = this.state
    $.ajax({
      method: 'POST',
      url: '/check_phone_code',
      data :{code, phone},
      success: (res) => {
        if (res.error) {
          confirmation.failure('Invalid code')
        } else if (res.success) change_step(2)
      }
    })
  },

  render: function() {
    let {code, open} = this.state
    let {close}  = this.props
    return (
      <Modal
        open = {open}
        close = {close}
        title = "Verify your phone"
        action = {this.send_code}
        action_name = "Next"
      >
        <div className='row'>
        <div className='col-xs-12 col-sm-10 col-sm-offset-1'>
          <div className="input-group input-group-lg big-bottom-space">
            <span className="input-group-addon">Code</span>
            <input id="code" type="text" className="form-control" value={code} onChange={this.handle_change} />
          </div>
          <a href='#' className='red-text text-centered' onClick={() => change_step(1)}> Try again </a>
        </div>
        </div>
      </Modal>
    )
  }

})