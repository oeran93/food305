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
          {user && <a className="btn red-btn" onClick={() => window.location.href = "/sign_out"}>SIGN OUT</a>}
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
