import React from 'react'
import Navbar from './navbar.jsx'
import Stations_today from './stations_today.jsx'
import {BrowserRouter as Router, Route} from 'react-router-dom'

class Root extends React.Component {

  constructor (props) {
    super(props)
  }

  render () {
    return (
        <Router>
          <div>
            <Navbar />
            <div className="container-fluid">
              <Route exact path='/' component={Stations_today} />
            </div>
          </div>
        </Router>
    )
  }

}
module.exports = Root
