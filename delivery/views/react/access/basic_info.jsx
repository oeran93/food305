const React        = require('react')
const $            = require('jquery')
const confirmation = require('../../../../tools/confirmation.js')()
const errors       = require('../../../../tools/errors.js')
const PropTypes    = require('prop-types')

class Basic_Info extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      phone: "",
      name: "",
      email: ""
    }
  }

  handle_change (event) {
    let state = this.state
    state[event.target.id] = event.target.value
    this.setState(state)
  }

  send_info () {
    let {change_step} = this.props
    $.ajax({
      method: 'POST',
      url: '/create_user',
      data : this.state,
      success: (res) => {
        if(res.success) change_step({step: 1, phone: this.state.phone})
        else if (res.error) {
          confirmation.failure(res.error.message)
          if (res.error.number == errors.user_exists.number) change_step({step: 3})
        }
      }
    })
  }

  render () {
    let {phone, name, email} = this.state
    let {autofocus} = this.props
    return (
      <div className='row access'>
        <div className='col-xs-12 text-center text-uppercase'>
          <h3>Welcome to our community</h3>
        </div>
        <div className='col-xs-12 input'>
          <input
            autoFocus={autofocus}
            id="phone"
            type="text"
            className="basic-input"
            value={phone}
            placeholder="Phone"
            onChange={this.handle_change.bind(this)}
            onKeyPress={(t) => {if (t.charCode === 13) this.send_info.bind(this)()}}
          />
        </div>
        <div className='col-xs-12 input'>
          <input
            id="name"
            type="text"
            className="basic-input"
            value={name}
            placeholder="What should we call you?"
            onChange={this.handle_change.bind(this)}
            onKeyPress={(t) => {if (t.charCode === 13) this.send_info.bind(this)()}}
          />
        </div>
        <div className='col-xs-12 input'>
          <input
            id="email"
            type="text"
            className="basic-input"
            value={email}
            placeholder="Email"
            onChange={this.handle_change.bind(this)}
            onKeyPress={(t) => {if (t.charCode === 13) this.send_info.bind(this)()}}
          />
        </div>
        <div className='col-xs-12'>
          <button className='btn red-btn pull-right' onClick={this.send_info.bind(this)}>
            Next
          </button>
        </div>
      </div>
    )
  }

}

Basic_Info.propTypes = {
  change_step: PropTypes.func.isRequired,
  autofocus: PropTypes.bool
}

module.exports = Basic_Info
