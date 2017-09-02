import React from 'react'
import PropTypes from 'prop-types'

class Uneditable_Text extends React.Component {
  
  constructor (props) {
    super(props)
  }
  
  render () {
    let {name, value, icon} = this.props
    return (
      <div className="row">
        <div className="col-xs-12">
          <h3 className="text-muted"><span className="label label-default"><span className={"fa fa-"+icon}/> {name}</span> {value}</h3>
        </div>
      </div>
    )
  }
  
}

Uneditable_Text.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  icon: PropTypes.string
}

module.exports = Uneditable_Text