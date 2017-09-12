import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {Link} from "react-router-dom"

module.exports = function (props) {
  return (
    <nav className="navbar navbar-default">
      <div className="container">
        <div className="navbar-header">
          <a className="navbar-brand" href="#">Vimi Curator</a>
          <Link className="btn btn-default navbar-btn" to="/">Today</Link>
          <Link className="btn btn-default navbar-btn" to="/stations_schedule"> Stations Schedule</Link>
          <Link className="btn btn-default navbar-btn" to="/manage_restaurants"> Manage Restaurants</Link>
          <Link className="btn btn-default navbar-btn" to="/add_meal"> Add Meal</Link>
          <Link className="btn btn-default navbar-btn" to="/add_restaurant"> Add Restaurant</Link>
        </div>
      </div>
    </nav>
  )
}
