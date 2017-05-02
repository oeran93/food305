const React        = require('react')
const $            = require('jquery')
const confirmation = require('../../../../tools/confirmation.js')()
const errors       = require('../../../../tools/errors.js')
const PropTypes    = require('prop-types')

class Sign_In_Code extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      code: ""
    }
  }

  handle_change (event) {
    let state = this.state
    state[event.target.id] = event.target.value
    this.setState(state)
  }

  check_code () {
    let {change_step,phone} = this.props
    let {code} = this.state
    $.ajax({
      method: 'POST',
      url: '/check_phone_code',
      data: {code, phone},
      success: (res) => {
        if (res.success) change_step(2)
        else if (res.error.number == errors.invalid_code.number) confirmation.failure(res.error.message)
      }
    })
  }

  render () {
    let {code} = this.state
    let {change_step}  = this.props
    return (
      <div className='row access'>
        <div className='col-xs-12 text-center text-uppercase'>
          <h2>Verify your phone</h2>
        </div>
        <div className='col-xs-12 input'>
            <input
              autoFocus
              id="code"
              type="text"
              className="basic-input"
              value={code}
              placeholder="Verification Code"
              onChange={this.handle_change.bind(this)}
              onKeyPress={(t) => {if (t.charCode === 13) this.check_code.bind(this)()}}
            />
        </div>
        <div className='col-xs-12'>
          <button className='btn red-btn pull-left' onClick={() => change_step(0)}>
            Try again
          </button>
          <button className='btn red-btn pull-right margin-right-5' onClick={this.check_code.bind(this)}>
            Next
          </button>
        </div>
      </div>
    )
  }

}

Sign_In_Code.propTypes = {
  change_step: PropTypes.func.isRequired,
  phone: PropTypes.string.isRequired
}

module.exports = Sign_In_Code
