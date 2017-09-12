import React from 'react'
import Payment from './payment/payment.jsx'
import globals from '../../../tools/globals.js'

class Subscribe extends React.Component {
  
  constructor (props) {
    super(props)
    this.state = {
      step: 0
    }
  }
  
  change_step (step) {
    this.setState({step})
  }

  render() {
    let {step} = this.state
    let user = window.store.get('user')
    return (
      <div className="banner subscribe-banner">
        <div className="container">
          <div className="row">
            {step == 0 && 
              <div className="col-xs-12 col-sm-8 col-sm-offset-2 text-center join-our-community">
                <h1>Your {globals.trial_days} days trial is over. Are we worth it?</h1>
                  <button className="btn red-btn" onClick={() => this.change_step.bind(this)(1)}>
                    Yes, keep bringing me lunch
                  </button>
              </div>
            }
            {step == 1 &&
              <div className="col-xs-12 col-sm-8 col-sm-offset-2 text-center">
                <h1>$9.99/Month</h1>
                <h2>No more delivery fees</h2>
                <Payment url="/subscribe" btn_text="Subscribe" last_4_digits={user.last_4_digits}/>
              </div>
            }
          </div>
        </div>
      </div>
    )
  }

}

module.exports = Subscribe
