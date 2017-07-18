import React from 'react'
import Meals from './meals.jsx'
import Orders from './orders.jsx'
import Restaurants from './restaurants.jsx'
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
              <Route exact path='/meals' component={Meals} />
              <Route exact path='/restaurants' component={Restaurants} />
            </div>
          </div>
        </Router>
    )
  }

}
module.exports = Root
