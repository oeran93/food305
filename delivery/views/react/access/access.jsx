const React            = require('react')
const Sign_In_Phone    = require('./sign_in_phone.jsx')
const Sign_In_Code     = require('./sign_in_code.jsx')
const Sign_In_Password = require('./sign_in_password.jsx')
const Sign_In          = require('./sign_in.jsx')
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
    let {phone, step} = this.state
    if (step == 0) return <Sign_In_Phone change_step={this.change_step.bind(this)}/>
    else if (step == 1) return <Sign_In_Code phone={phone} change_step={this.change_step.bind(this)}/>
    else if (step == 2) return <Sign_In_Password phone={phone} change_step={this.change_step.bind(this)}/>
    else if (step == 3) return <Sign_In change_step={this.change_step.bind(this)}/>
  }

}

Access.propTypes = {
  step: PropTypes.number
}

Access.defaultProps = {
  step: 3
}

module.exports = Access
