import React from 'react'
import $ from 'jquery'
const date = require('../../../tools/date.js')()
const globals = require('../../../tools/globals.js')
const _ = require('underscore')
const ajx = require('../../../tools/ajax.js')()

class Add_restaurant extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      phone: 0,
      closed: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount() {

  }

  handleChange(event) {
    const target = event.target
    const value = target.value
    const name = target.name
    this.setState({[name]: value})
  }

  handleSubmit(event) {
    const new_res = {
      name: this.state.name,
      phone: this.state.phone,
      closed: this.state.image
    }

    ajx.call({
      method: "POST",
      url: '/add_restaurant',
      data: new_res,
      success: (data) => {alert("Successfully inserted " + data)}
    })

    event.preventDefault()
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label> Name:</label>
        <input type="text" onChange={this.handleChange} name="name" className="form-control"/>
        <label> Phone: </label>
        <input type="number" onChange={this.handleChange} name="phone" className="form-control"/>
        <label> Closed day: </label>
        <input type="text" onChange={this.handleChange} name="closed" className="form-control"/>
        <input type="submit" value="Submit" className="form-control"/>
      </form>
    )
  }
}
module.exports = Add_restaurant
