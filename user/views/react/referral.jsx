import React from 'react'
const ajx = require('../../../tools/ajax.js')()

class Referral extends React.Component {
  
  constructor (props) {
    super(props)
    this.state = {
      step: 0,
      referred_email: ""
    }
  }
  
  add_referrer () {
    ajx.call({
      method: "POST",
      url: "/add_referrer",
      data: {referred_email: this.state.email},
      success: () => this.setState({step: 1}),
      show_messages: true
    })
  }

  render() {
    let {step, email} = this.state
    let user = window.store.get('user')
    return (
      <div className="banner referral-banner">
        <div className="container">
          <div className="row">
            {step == 0 && 
              <div className="col-xs-12 col-sm-8 col-sm-offset-2 text-center join-our-community">
                <h1> Refer a friend and you both get 50% off when he signs up. </h1>
                <input 
                  type="text" 
                  className="basic-input" 
                  value={email}
                  onChange={(e) => this.setState({email: e.target.value})}
                  placeholder="Friend Email"
                />
                <button className="btn red-btn margin-top-10" onClick={ () => this.add_referrer() }>
                  Send him an email
                </button>
              </div>
            }
            {step == 1 &&
              <div className="col-xs-12 col-sm-8 col-sm-offset-2 text-center">
                <h1>We sent your friend an email. We will let you know when he signs up!</h1>
                <button className="btn red-btn margin-top-10" onClick={ () => window.location.href = '/' }>
                  Go to the menu
                </button>
              </div>
            }
          </div>
        </div>
      </div>
    )
  }

}

module.exports = Referral
