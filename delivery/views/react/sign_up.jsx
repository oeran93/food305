var React          = require('react')
var _              = require('underscore')
const confirmation = require('../../../tools/confirmation.js')()

module.exports = React.createClass({

  contextTypes: {
    user: React.PropTypes.object
  },

  getInitialState: function () {
    return {
      email: ''
    }
  },

  submit: function (data) {
    this.setState({data})
    $.ajax({
      url: '/update_user',
      type: "POST",
      data: data, 
      success: res => {
        if (res.error) {
          confirmation.failure(`Error: ${res.error}`)
        } else {
          window.location.href = '/'
        }
      }
    })
  },

  handle_change: function (event) {
    let state = this.state
    state[event.target.id] = event.target.value
    this.setState(state)
  },

  render: function() {
    let {email} = this.state
    return (
      <div className='container'>
        <div className='info-box'>
          <h1 className='red-text'> Food 305 </h1>
          <h2 className='red-text big-bottom-space'>Tell us your email. <br /> We will alert you when your food arrives!</h2>
          <div className='input-group top-space info-box-input'>
            <input id='email' type="text" className="form-control" placeholder="email" value={email} onChange={this.handle_change}/>
            <span className="input-group-btn">
              <button className="btn btn-default" type="button" onClick={() => this.submit({email})}> Submit </button>
            </span>
          </div>
        </div>
      </div>
    )
  }

})