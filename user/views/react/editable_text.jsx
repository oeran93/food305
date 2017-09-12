import React from 'react'
import PropTypes from 'prop-types'

class Editable_Text extends React.Component {
  
  constructor (props) {
    super(props)
    this.state = {
      editing: false,
      value: props.value
    }
  }
  
  on_change(event) {
    this.setState({value: event.target.value})
  }
  
  on_key_pressed (event) {
    if (event.charCode === 13) {
      this.save_pressed()
    }
  }
  
  save_pressed () {
    let {handleChange, prop_name} = this.props
    handleChange({name: prop_name, value: this.state.value})
    this.setState({editing: false})
  }
  
  componentWillReceiveProps (nextProps) {
    this.setState({
      value: nextProps.value
    })
  }
  
  render () {
    let {name, autofocus,icon} = this.props
    let {editing, value} = this.state
    return (
      <div className="row">
        {editing 
          ?
            <span>
              <div className="col-xs-8">
                <input
                  autoFocus={autofocus}
                  type="text"
                  className="basic-input"
                  placeholder={name}
                  value={value}
                  name={name}
                  onChange={this.on_change.bind(this)}
                  onKeyPress={this.on_key_pressed.bind(this)}
                />
              </div>
              <div className="col-xs-4">
                <span className="btn btn-info pull-right" onClick={this.save_pressed.bind(this)}>Save</span>
              </div>
            </span>
          :
            <h3 className="col-xs-12">
              <div className="pull-left ellipsis"><span className="label label-default"><span className={"fa fa-"+icon}></span> {name}</span> {value}</div>
              <div className="pull-right">
                <span className="btn btn-info" onClick={() => this.setState.bind(this)({editing: true})}>Edit {name}</span>
              </div>
            </h3>
        }
      </div>
    )
  }
  
}

Editable_Text.propTypes = {
  name: PropTypes.string,
  prop_name: PropTypes.string,
  value: PropTypes.string,
  autofocus: PropTypes.bool,
  icon: PropTypes.string,
  handleChange: PropTypes.func
}

module.exports = Editable_Text