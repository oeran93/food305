const React        = require('react')
const PropTypes    = require('prop-types')
const ajx = require('../../../../tools/ajax.js')()

class Code extends React.Component {

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
    ajx.call({
      method: 'POST',
      url: '/check_phone_code',
      data: {code, phone},
      success: (res) => change_step({step: 2}),
      show_messages: true,
      show_loading: true
    })
  }

  render () {
    let {code} = this.state
    let {change_step, autofocus}  = this.props
    return (
      <div className='row access'>
        <div className='col-xs-12 text-center text-uppercase'>
          <h3>We sent you a verification code</h3>
        </div>
        <div className='col-xs-12 input'>
            <input
              autoFocus={autofocus}
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
          <button className='btn red-btn pull-left' onClick={() => change_step({step: 0})}>
            Send Me Another Code
          </button>
          <button className='btn red-btn pull-right margin-right-5' onClick={this.check_code.bind(this)}>
            Next
          </button>
        </div>
      </div>
    )
  }

}

Code.propTypes = {
  change_step: PropTypes.func.isRequired,
  phone: PropTypes.string.isRequired,
  autofocus: PropTypes.bool
}

module.exports = Code
