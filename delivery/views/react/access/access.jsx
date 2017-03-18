const React        = require('react')
const confirmation = require('../../../../tools/confirmation.js')()
const Sign_In_Phone = require('./sign_in_phone.jsx')
const Sign_In_Code = require('./sign_in_code.jsx')
const Sign_In_Password = require('./sign_in_password.jsx')
const Sign_In = require('./sign_in.jsx')

module.exports = React.createClass({

  propTypes: {
    step: React.PropTypes.number,
    close: React.PropTypes.func.isRequired
  },

  getDefaultProps: function () {
    return {
      step: 3
    }
  },

  getInitialState: function () {
    return {
      step: this.props.step,
      phone: ""
    }
  },

  change_step: function (step, phone) {
    this.setState({step})
    if (phone) this.setState({phone})
  },

  render: function() {
    let {phone, step} = this.state
    let {close} = this.props
    var module = null
    switch (step) {
      case 0: 
          module = <Sign_In_Phone Sign_In change_step={this.change_step} close={close}/>
          break
      case 1:
          module = <Sign_In_Code phone={phone} Sign_In change_step={this.change_step} close={close}/>
          break
      case 2:
          module = <Sign_In_Password phone={phone} Sign_In change_step={this.change_step} close={close}/>
          break
      case 3:
          module = <Sign_In change_step={this.change_step} close={close}/>
    }
    return (
      <div>
        {module}
      </div>
    )
  }

})