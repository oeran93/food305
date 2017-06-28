const React        = require('react')
const $            = require('jquery')
const confirmation = require('../../../../tools/confirmation.js')()
const errors       = require('../../../../tools/errors.js')
const PropTypes    = require('prop-types')

class Sign_In_Phone extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
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
        else if (res.error) confirmation.failure(res.error.message)
      }
    })
  }

  render () {
    let {phone} = this.state
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
            onKeyPress={(t) => {if (t.charCode === 13) this.send_phone.bind(this)()}}
          />
        </div>
        <div className='col-xs-12'>
          <button className='btn red-btn pull-right' onClick={this.send_phone.bind(this)}>
            Next
          </button>
        </div>
      </div>
    )
  }

}

Sign_In_Phone.propTypes = {
  change_step: PropTypes.func.isRequired,
  autofocus: PropTypes.bool
}

module.exports = Sign_In_Phone
