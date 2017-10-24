import React from 'react'
import PropTypes from 'prop-types'
import $ from 'jquery'
const date = require('../../../tools/date.js')()
const globals = require('../../../tools/globals.js')
const _ = require('underscore')
const ajx = require('../../../tools/ajax.js')()

class Restaurant extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = _.extend({
      name: '',
      phone: 0,
      closed: []
    },props.restaurant)
  }

  handle_change(event) {
    const target = event.target
    const value = target.value
    const name = target.name
    this.setState({[name]: value})
  }
  
  handle_checkbox(event) {
    const {closed} = this.state
    if (event.target.checked) closed.push(event.target.value)
    else closed.splice(closed.indexOf(event.target.value),1)
    this.setState({closed})
  }

  handle_submit() {
    ajx.call({
      method: "POST",
      url: this.props.restaurant ? '/edit_restaurant' : '/add_restaurant',
      data: this.state,
      success: window.location.reload()
    })
  }

  render() {
    const restaurant = this.state
    return (
      <div className="clearfix">
        <div className="margin-10">
          <label> Name:</label>
          <input type="text" value={restaurant.name} onChange={this.handle_change.bind(this)} name="name" className="form-control"/>
        </div>
        <div className="margin-10">
          <label> Phone: </label>
          <input type="text" value={restaurant.phone} onChange={this.handle_change.bind(this)} name="phone" className="form-control"/>
        </div>
        <div className="margin-10">
          <label> Closed days: </label>
          {date.get_weekdays().map(day => {
            return (
              <div key={day} className="form-check">
                <label className="form-check-label">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    value={day} 
                    onChange={this.handle_checkbox.bind(this)}
                    checked={restaurant.closed.includes(day)}
                  /> {day}
                </label>
              </div>
            )
          })}
        </div>
        <div className="margin-10 pull-right">
          <button className="btn btn-default" onClick={this.handle_submit.bind(this)} > Submit </button>
        </div>
      </div>
    )
  }
}

Restaurant.propTypes = {
  restaurant: PropTypes.object
}

module.exports = Restaurant
