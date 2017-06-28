const React            = require('react')
const Phone            = require('./phone.jsx')
const Code             = require('./code.jsx')
const Password         = require('./password.jsx')
const Sign_In          = require('./sign_in.jsx')
const Forgot_Pwd       = require('./forgot_pwd.jsx')
const Recover_Pwd      = require('./recover_pwd.jsx')
const _                = require('underscore')
const PropTypes        = require('prop-types')

class Access extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      step: props.step,
      phone: ""
    }
  }

  change_step (step, phone) {
    this.setState({step})
    if (phone) this.setState({phone})
  }

  render () {
    let {autofocus} = this.props
    let {phone, step} = this.state
    if (step == 0) return <Phone autofocus={autofocus} change_step={this.change_step.bind(this)}/>
    else if (step == 1) return <Code autofocus={autofocus} phone={phone} change_step={this.change_step.bind(this)}/>
    else if (step == 2) return <Password autofocus={autofocus} phone={phone} change_step={this.change_step.bind(this)}/>
    else if (step == 3) return <Sign_In autofocus={autofocus} change_step={this.change_step.bind(this)}/>
    else if (step == 4) return <Forgot_Pwd autofocus={autofocus} change_step={this.change_step.bind(this)}/>
    else if (step == 5) return <Recover_Pwd autofocus={autofocus} phone={phone} change_step={this.change_step.bind(this)}/>
  }

}

Access.propTypes = {
  step: PropTypes.number,
  autofocus: PropTypes.bool
}

Access.defaultProps = {
  step: 3,
  autofocus: true
}

module.exports = Access
