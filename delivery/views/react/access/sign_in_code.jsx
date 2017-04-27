const React        = require('react')
const Modal        = require('../modal.jsx')
const $            = require('jquery')
const confirmation = require('../../../../tools/confirmation.js')()
const errors       = require('../../../../tools/errors.js')
const PropTypes    = require('prop-types')

class Sign_In_Code extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      open: true,
      code: ""
    }
  }

  close () {
    this.setState({open: false})
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
    let {code, open} = this.state
    let {close, change_step}  = this.props
    return (
      <Modal
        open = {open}
        close = {close}
        title = "Verify your phone"
        action = {this.check_code.bind(this)}
        action_name = "Next"
      >
        <div className='row'>
        <div className='col-xs-12 col-sm-10 col-sm-offset-1'>
          <div className="input-group input-group-lg big-bottom-space">
            <span className="input-group-addon">Code</span>
            <input id="code" type="text" className="form-control" value={code} onChange={this.handle_change.bind(this)} />
          </div>
          <a href='#' className='red-text text-centered' onClick={ () => change_step(0)}> Try again </a>
        </div>
        </div>
      </Modal>
    )
  }

}

Sign_In_Code.propTypes = {
  change_step: PropTypes.func.isRequired,
  phone: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired
}

module.exports = Sign_In_Code
