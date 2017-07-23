import React from 'react'
import Navbar from './navbar.jsx'
import Stations_today from './stations_today.jsx'
import Stations_schedule from './stations_schedule.jsx'
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
              <Route exact path='/stations_schedule' component={Stations_schedule} />
            </div>
          </div>
        </Router>
    )
  }

}
module.exports = Root
