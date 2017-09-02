import React from 'react'
import PropTypes from 'prop-types'
import {Link} from "react-router-dom"

class Nav_Bar extends React.Component {

  constructor (props) {
    super(props)
  }

  render () {
    let {toggleModal} = this.props
    let user = window.store.get('user')
    return (
      <div className="navigation-bar clearfix">
        <div className="logo pull-left">
          <img src="./images/logo.png" height="35px"/>
        </div>
        <div className="pull-right">
          <div className="hidden-xs">
            {user && <Link className="btn red-btn" to="/">MENU</Link>}
            {user && <Link className="btn red-btn" to="/profile">PROFILE</Link>}
            {user && <a className="btn red-btn" onClick={() => window.location.href = "/sign_out"}>SIGN OUT</a>}
          </div>
          <div className="visible-xs">
            {user && <Link className="btn red-btn" to="/"><span className="fa fa-bars"></span></Link>}
            {user && <Link className="btn red-btn" to="/profile"><span className="fa fa-user"></span></Link>}
            {user && <a className="btn red-btn" onClick={() => window.location.href = "/sign_out"}><span className="fa fa-sign-out"></span></a>}
          </div>
          {!user && <button className="btn red-btn" onClick={() => toggleModal('access_modal', {open:true, step:3})}> SIGN IN </button>}
        </div>
      </div>
    )
  }

}

Nav_Bar.propTypes = {
  toggleModal: PropTypes.func.isRequired
}

module.exports = Nav_Bar
