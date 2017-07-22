const React        = require('react')
const PropTypes    = require('prop-types')
const ajx = require('../../../../tools/ajax.js')()

class Forgot_Pwd extends React.Component {

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

  check_phone () {
    let change_step = this.props.change_step
    let phone = this.state.phone
    ajx.call({
      method: 'GET',
      url: '/forgot_pwd',
      data: {phone},
      success: (res) => change_step({step: 5, phone}),
      show_messages: true,
      show_loading: true
    })
  }

  render () {
    let {phone} = this.state
    let {change_step, autofocus}  = this.props
    return (
      <div className='row access'>
        <div className='col-xs-12 text-center text-uppercase'>
          <h3>Enter your phone number</h3>
        </div>
        <div className='col-xs-12 input'>
            <input
              autoFocus={autofocus}
              id="phone"
              type="text"
              className="basic-input"
              value={phone}
              placeholder="Phone Number"
              onChange={this.handle_change.bind(this)}
              onKeyPress={(t) => {if (t.charCode === 13) this.check_phone.bind(this)()}}
            />
        </div>
        <div className='col-xs-12'>
          <button className='btn red-btn pull-right margin-right-5' onClick={this.check_phone.bind(this)}>
            Next
          </button>
        </div>
      </div>
    )
  }

}

Forgot_Pwd.propTypes = {
  change_step: PropTypes.func.isRequired,
  autofocus: PropTypes.bool
}

module.exports = Forgot_Pwd
