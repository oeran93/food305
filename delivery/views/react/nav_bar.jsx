import React from 'react'
import globals from '../../../tools/globals.js'
import PropTypes from 'prop-types'
import {Link} from "react-router-dom"
import {Modal} from "react-bootstrap"
import Access from "./access/access.jsx"

class Nav_Bar extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      open: false
    }
  }

  toggleModal () {
    this.setState((prev_state) => ({
      open: !prev_state.open
    }))
  }

  render () {
    let {user} = this.props
    let {open} = this.state
    return (
      <div className="container-fluid navigation-bar">
        <div className="col-xs-12">
          <div className="logo pull-left">
            <img src="./images/logo.png" height="50px"/>
          </div>
          <div className="pull-right">
            <Link className="btn red-btn margin-right-5" to="/">HOME</Link>
            {user && <Link className="btn red-btn margin-right-5" to="/my_meals">MY MEALS</Link>}
            {user && <a className="btn red-btn margin-right-5" onClick={() => window.location.href = "/logout"}>LOGOUT</a>}
            {!user && <button className="btn red-btn margin-right-5" onClick={this.toggleModal.bind(this)}>
              SIGN IN
            </button>}
          </div>
        </div>
        <Modal show={open} onHide={this.toggleModal.bind(this)}>
          <Modal.Body>
            <Access step={3} />
          </Modal.Body>
        </Modal>
      </div>
    )
  }

}

Nav_Bar.propTypes = {
  user: PropTypes.oneOfType([PropTypes.bool, PropTypes.object])
}

module.exports = Nav_Bar
