import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {Link} from "react-router-dom"
import Restaurant from './restaurant.jsx'
const {Modal} = require('react-bootstrap')
const Meal = require('./meal.jsx')

export default class NavBar extends React.Component {
  
  constructor (props) {
    super(props)
    this.state = {
      adding_meal: false,
      adding_restaurant: false
    }
  }
  
  toggle_modal (modal) {
    const state = this.state
    state[modal] = !this.state[modal]
    this.setState(state)
  }
  
  render () {
    let {adding_meal, adding_restaurant} = this.state
    return (
      <nav className="navbar navbar-default">
        <div className="container">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">Vimi Curator</a>
            <Link className="btn btn-default navbar-btn" to="/"> Manage </Link>
            <button className="btn btn-success margin-left-5" onClick={() => this.toggle_modal.bind(this)('adding_meal')}>Add Meal</button>
            <button className="btn btn-success margin-left-5" onClick={() => this.toggle_modal.bind(this)('adding_restaurant')}>Add Restaurant</button>
            <a href="/sign_out" className="btn btn-default navbar-btn margin-left-5">Log Out</a>
          </div>
        </div>
        <Modal show={adding_meal} onHide={() => this.toggle_modal.bind(this)('adding_meal')}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <Meal />
          </Modal.Body>
        </Modal>
        <Modal show={adding_restaurant} onHide={() => this.toggle_modal.bind(this)('adding_restaurant')}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <Restaurant />
          </Modal.Body>
        </Modal>
      </nav>
    )
  }
}
