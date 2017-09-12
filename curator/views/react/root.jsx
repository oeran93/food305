import React from 'react'
import Navbar from './navbar.jsx'
import Stations_today from './stations_today.jsx'
import Stations_schedule from './stations_schedule.jsx'
import Add_meal from './add_meal.jsx'
import Add_restaurant from './add_restaurant.jsx'
import Manage_restaurants from './manage_restaurants.jsx'
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
              <Route exact path='/manage_restaurants' component={Manage_restaurants} />
              <Route exact path='/add_meal' component={Add_meal} />
              <Route exact path='/add_restaurant' component={Add_restaurant} />
            </div>
          </div>
        </Router>
    )
  }

}
module.exports = Root
