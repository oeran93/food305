const React        = require('react')
const Modal        = require('../modal.jsx')
const $            = require('jquery')
const confirmation = require('../../../../tools/confirmation.js')()
const errors       = require('../../../../tools/errors.js')
const PropTypes    = require('prop-types')

class Sign_In_Phone extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      open: true,
      phone: ""
    }
  }

  handle_change (event) {
    let state = this.state
    state[event.target.id] = event.target.value
    this.setState(state)
  }

  send_phone () {
    let {change_step} = this.props
    let {phone} = this.state
    $.ajax({
      method: 'POST',
      url: '/create_user',
      data :{phone},
      success: (res) => {
        if(res.success) change_step(1,phone)
        else if (res.error.number == errors.user_exists.number) confirmation.failure(res.error.message)
        else if (res.error.number == errors.invalid_phone.number) confirmation.failure(res.error.message)
      }
    })
  }

  render () {
    let {phone, open} = this.state
    let {close} = this.props
    return (
      <Modal
        open = {open}
        close = {close}
        title = "Welcome to our community"
        action = {this.send_phone.bind(this)}
        action_name = "Next"
      >
        <div className='row'>
        <div className='col-xs-12 col-sm-10 col-sm-offset-1'>
          <div className="input-group input-group-lg">
            <span className="input-group-addon">Phone</span>
            <input id="phone" type="text" className="form-control" value={phone} onChange={this.handle_change.bind(this)} />
          </div>
        </div>
        </div>
      </Modal>
    )
  }

}

Sign_In_Phone.propTypes = {
  change_step: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired
}

module.exports = Sign_In_Phone
