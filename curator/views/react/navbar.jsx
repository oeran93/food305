import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {Link} from "react-router-dom"

module.exports = function (props) {
  return (
    <nav className="navbar navbar-default">
      <div className="container">
        <div className="navbar-header">
          <a className="navbar-brand" href="#">Vimi Curator</a>
          <Link className="btn btn-default navbar-btn" to="/">Orders</Link>
          <Link className="btn btn-default navbar-btn" to="/meals">Meals</Link>
          <Link className="btn btn-default navbar-btn" to="/restaurants">Restaurants</Link>
        </div>
      </div>
    </nav>
  )
}
