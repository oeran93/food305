import React from 'react'
import $ from 'jquery'
import _ from 'underscore'
import Home from './home.jsx'
import Nav_Bar from './nav_bar.jsx'
import Access from './access/access.jsx'
import About from './about.jsx'
import Payment from './payment/payment.jsx'
import Footer from './footer.jsx'
import {Modal} from 'react-bootstrap'
import {BrowserRouter as Router, Route} from 'react-router-dom'

class Root extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      render: false,
      user: null,
      access_modal: {open: false, step: 3},
      payment_modal: {open: false}
    }
  }

  toggleModal (modal, info) {
    let state = this.state
    state[modal] = _.extend(state[modal],info)
    this.setState(state)
  }

  componentWillMount () {
    $.ajax({
      method: 'GET',
      url: '/profile',
      success: data => {
        this.setState({
          user: data.user,
          render: true
        })
      }
    })
  }

  render () {
    let {render, user, access_modal, payment_modal} = this.state
    if (!render) return null
    else {
      return (
        <Router>
          <div>
            {/*Navigation Bar*/}
            <Nav_Bar user={user} toggleModal={this.toggleModal.bind(this)}/>
            {/*Main Content*/}
            <Route exact path='/' component={
                () => user ? <Home user={user} toggleModal={this.toggleModal.bind(this)}/> : <About toggleModal={this.toggleModal.bind(this)}/>
              }
            />
            {/*Access Modal*/}
            <Modal show={access_modal.open} onHide={() => this.toggleModal.bind(this)('access_modal', {open:false})}>
              <Modal.Body>
                <Access step={access_modal.step} />
              </Modal.Body>
            </Modal>
            {/*Payment Modal*/}
            <Modal show={payment_modal.open} onHide={() => this.toggleModal.bind(this)('payment_modal', {open:false})}>
              <Modal.Body>
                <Payment autofocus={true}/>
              </Modal.Body>
            </Modal>
            {/*Footer*/}
            <Footer />
          </div>
        </Router>
      )
    }
  }

}
module.exports = Root
