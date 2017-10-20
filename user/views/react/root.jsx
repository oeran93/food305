import React from 'react'
import _ from 'underscore'
import Menu from './menu.jsx'
import Nav_Bar from './nav_bar.jsx'
import Access from './access/access.jsx'
import About from './about.jsx'
import Welcome from './welcome.jsx'
import Subscribe from './subscribe.jsx'
import Profile from './profile.jsx'
import Failed_Billing from './failed_billing.jsx'
import Footer from './footer.jsx'
import Referral from './referral.jsx'
import {Modal} from 'react-bootstrap'
import {HashRouter as Router, Route,} from 'react-router-dom'
const ajx = require('../../../tools/ajax.js')()

class Root extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      render: false,
      access_modal: {open: false, step: 3}
    }
    window.store.setAppRoot(this)
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
        window.store.set('user', data.user)
        this.setState({render: true})
      }
    })
  }

  render () {
    const {render, access_modal} = this.state
    const user = window.store.get('user')
    if (!render) return null
    return (
      <Router>
        <div>
          <div className="confirmation-wrapper">
            <div className='confirmation success'></div>
            <div className='confirmation failure'></div>
          </div>
          <Nav_Bar toggleModal={this.toggle_modal.bind(this)}/>
          {user 
            ?
              <div>
                <Route exact path='/' component={Menu} />
                <Route exact path='/about' component={About} />
                <Route path="/subscribe" component={Subscribe} />
                <Route path="/referral" component={Referral} />
                <Route path="/failed_billing" component={Failed_Billing} />
                <Route path="/profile" component={Profile} />
              </div>
            :
              <div>
                <Route path='/' component={() => <Welcome toggle_modal={this.toggle_modal.bind(this)}/>}/>
              </div>
          }
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
          <Footer />
        </div>
      </Router>
    )
  }

}
module.exports = Root
