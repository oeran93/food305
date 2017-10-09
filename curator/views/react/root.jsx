import React from 'react'
import Navbar from './navbar.jsx'
import Sign_In from './sign_in.jsx'
import Manage from './manage.jsx'
import {BrowserRouter as Router, Route} from 'react-router-dom'
const ajx = require('../../../tools/ajax.js')()

class Root extends React.Component {

  constructor (props) {
    super(props)
    window.store.setAppRoot(this)
  }
  
  componentWillMount () {
    ajx.call({
      method: 'GET',
      url: '/profile',
      success: data => {
        window.store.set('curator', data.curator)
      }
    })
  }

  render () {
    const curator = window.store.get('curator')
    return (
        <Router>
          <div>
          {curator 
            ?
            <div>
              <Navbar />
              <div className="container-fluid">
                <Route exact path='/' component={Manage} />
              </div>
            </div>
            :
            <div>
              <div className="container">
                <div className="row">
                  <div className="col-md-8 col-md-offset-2">
                    <Route exact path='/' component={() => <Sign_In />} />
                  </div>
                </div>
              </div>
            </div>
          }
          </div>
        </Router>
    )
  }

}
module.exports = Root
