import React from 'react'
import _ from 'underscore'
import Home from './home.jsx'
import Nav_Bar from './nav_bar.jsx'
import Access from './access/access.jsx'
import About from './about.jsx'
import Subscribe from './subscribe.jsx'
import Failed_Billing from './failed_billing.jsx'
import {Modal} from 'react-bootstrap'
import {HashRouter as Router, Route,} from 'react-router-dom'
const ajx = require('../../../tools/ajax.js')()

class Root extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      render: false,
      user: null,
      access_modal: {open: false, step: 3}
    }
  }

  toggle_modal (modal, info) {
    let state = this.state
    state[modal] = _.extend(state[modal],info)
    this.setState(state)
  }

  componentWillMount () {
    ajx.call({
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
    let {render, user, access_modal} = this.state
    if (!render) return null
    return (
      <Router>
        <div>
          {/*Navigation Bar*/}
          <Nav_Bar user={user} toggleModal={this.toggle_modal.bind(this)}/>
          {/*Main Content*/}
          <Route exact path='/' component={() => user ? <Home user={user}/> : <About toggleModal={this.toggle_modal.bind(this)}/>}/>
          <Route path="/subscribe" component={Subscribe} />
          <Route path="/failed_billing" component={Failed_Billing} />
          {/*Access Modal*/}
          <Modal show={access_modal.open} onHide={() => this.toggle_modal.bind(this)('access_modal', {open:false})}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
              <Access step={access_modal.step} />
            </Modal.Body>
          </Modal>
          {/*Loading*/}
          <div className="loading-background">
            <div className="loading">
              <div className="lds-ripple">
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </Router>
    )
  }

}
module.exports = Root
