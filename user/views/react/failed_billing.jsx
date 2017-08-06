import React from 'react'
import Payment from './payment/payment.jsx'

class Failed_Billing extends React.Component {
  
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
    return (
      <div className="container">
        <div className="row">
          {step == 0 && 
            <div className="col-xs-12 text-center join-our-community">
              <h1>Something went wrong while processing your subscription payment</h1>
                <a href="mailto:info@vimifood.com" className="btn btn-success margin-right-5">Contact Us</a>
                <button className="btn btn-success" onClick={() => this.change_step.bind(this)(1)}>Try Another Credit Card</button>
            </div>
          }
          {step == 1 &&
            <div className="col-xs-12 text-center">
              <h1>$9.99</h1>
              <h2>No more delivery fees</h2>
              <Payment url="/subscribe" />
            </div>
          }
        </div>
      </div>
    )
  }

}

module.exports = Failed_Billing
