import React from 'react'
import PropTypes from 'prop-types'
import {Link} from "react-router-dom"

class Nav_Bar extends React.Component {

  constructor (props) {
    super(props)
  }

  render () {
    let {user, toggleModal} = this.props
    return (
      <div className="navigation-bar clearfix">
        <div className="logo pull-left">
          <img src="./images/logo.png" height="35px"/>
        </div>
        <div className="pull-right">
          <Link className="btn red-btn margin-right-5" to="/">HOME</Link>
          {user && <a className="btn red-btn margin-right-5" onClick={() => window.location.href = "/logout"}>LOGOUT</a>}
          {!user && <button className="btn red-btn" onClick={() => toggleModal('access_modal', {open:true, step:3})}>
            SIGN IN
          </button>}
        </div>
      </div>
    )
  }

}

Nav_Bar.propTypes = {
  user: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  toggleModal: PropTypes.func.isRequired
}

module.exports = Nav_Bar
