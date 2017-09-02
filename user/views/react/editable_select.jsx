import React from 'react'
import PropTypes from 'prop-types'
const ajx = require('../../../tools/ajax.js')()
const _ = require('underscore')

class Editable_Select extends React.Component {
  
  constructor (props) {
    super(props)
    this.state = {
      editing: false,
      option: props.option,
      options: props.options
    }
  }
  
  componentWillMount () {
    let {get_options_url, text_prop, value_prop} = this.props
    if (!get_options_url) return
    ajx.call({
      method: "GET",
      url: get_options_url,
      success: (data) => {
        this.setState({options: 
          _.reduce(data, (options, option) => {
            options.push({value: option[value_prop], text: option[text_prop]})
            return options
          },[])
        })
      }
    })
  }
  
  on_change(event) {
    const {options, value, selectedIndex} = event.target
    this.setState({
      option: {
        text: options[selectedIndex].innerHTML,
        value: value
      }
    })
  }
  
  save_pressed () {
    const {handleChange, prop_name} = this.props
    handleChange({name: prop_name, value: this.state.option})
    this.setState({editing: false})
  }
  
  componentWillReceiveProps (nextProps) {
    this.setState({
      option: nextProps.option
    })
  }
  
  render () {
    const {name, autofocus, icon} = this.props
    const {editing, option, options} = this.state
    return (
      <div className="row">
        {editing 
          ?
            <span>
              <div className="col-xs-8">
                <select className="form-control" value={option.value} onChange={this.on_change.bind(this)}>
                  {_.map(options, (o,i) => {
                    return <option key={i} value={o.value}> {o.text} </option>
                  })}
                </select>
              </div>
              <div className="col-xs-4">
                <span className="btn btn-info pull-right" onClick={this.save_pressed.bind(this)}>Save</span>
              </div>
            </span>
          :
            <h3 className="col-xs-12">
              <div className="pull-left"><span className="label label-default"><span className={"fa fa-"+icon}></span> {name}</span> {option.text}</div>
              <div className="pull-right">
                <span className="btn btn-info" onClick={() => this.setState.bind(this)({editing: true})}>Edit {name}</span>
              </div>
            </h3>
        }
      </div>
    )
  }
  
}

Editable_Select.propTypes = {
  name: PropTypes.string,
  prop_name: PropTypes.string,
  option: PropTypes.object,
  autofocus: PropTypes.bool,
  icon: PropTypes.string,
  get_options_url: PropTypes.string,
  options: PropTypes.array,
  handleChange: PropTypes.func
}

Editable_Select.defaultProps = {
  option: {}
}

module.exports = Editable_Select