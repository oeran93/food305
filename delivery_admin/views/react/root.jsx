import React from 'react'
import Meals_Stats from './meals_stats.jsx'
import Orders from './orders.jsx'
import Navbar from './navbar.jsx'
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
              <Route exact path='/' component={Orders} />
              <Route exact path='/meals_stats' component={Meals_Stats} />
            </div>
          </div>
        </Router>
    )
  }

}
module.exports = Root
