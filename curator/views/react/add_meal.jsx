import React from 'react'
import $ from 'jquery'
const date = require('../../../tools/date.js')()
const globals = require('../../../tools/globals.js')
const _ = require('underscore')
const ajx = require('../../../tools/ajax.js')()

class Add_meal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      price: 0,
      image: '',
      description: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount() {
    ajx.call({
      method: "GET",
      url: '/get_restaurants',
      success: (restaurants) => this.setState({restaurants})
    })
  }

  handleChange(event) {
    const target = event.target
    const value = target.value
    const name = target.name
    this.setState({[name]: value})
  }

  handleSubmit(event) {
    const new_meal = {
      restaurant: this.state.restaurant,
      name: this.state.name,
      price: this.state.price,
      image: this.state.image,
      description: this.state.description
    }
    ajx.call({
      method: "POST",
      url: '/add_meal',
      data: new_meal,
      success: (data) => {alert("Successfully inserted " + data)}
    })
    event.preventDefault()
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Restaurant:
          <select onChange={this.handleChange} name="restaurant">
            {_.map(this.state.restaurants, (restaurant, j) => {
              return (
                <option value={restaurant.name} key={j}>{restaurant.name}</option>
              )
            })}
          </select>
        </label>
        <br/>
        <label>
          Name:
          <input type="text" onChange={this.handleChange} name="name"/>
        </label>
        <br/>
        <label>
          Price:
          <input type="number" onChange={this.handleChange} name="price" />
        </label>
        <br/>
        <label>
          Image url:
          <input type="text" onChange={this.handleChange} name="image"/>
        </label>
        <br/>
        <label>
          Description:
          <textarea onChange={this.handleChange} name="description"/>
        </label>
        <br/>
        <input type="submit" value="Submit"/>
      </form>
    )
  }
}
module.exports = Add_meal
