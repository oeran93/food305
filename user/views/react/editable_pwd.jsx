import React from 'react'
import PropTypes from 'prop-types'
import Change_Pwd from './access/change_pwd.jsx'

class Editable_Pwd extends React.Component {
  
  constructor (props) {
    super(props)
    this.state = {
      editing: false
    }
  }
  
  handle_change () {
    this.setState({editing: false})
  }
  
  render () {
    let {editing} = this.state
    return (
      <div className="row">
          {editing && <Change_Pwd handle_change={this.handle_change.bind(this)}/>}
          {!editing &&
            <h3 className="col-xs-12">
              <div className="pull-left"><span className="label label-default"><span className="fa fa-key"></span> Password </span></div>
              <div className="pull-right" onClick={() => this.setState.bind(this)({editing: true})}><span className="btn btn-info"> Change Password </span></div>
            </h3>
          }
      </div>
    )
  }
  
}

module.exports = Editable_Pwd