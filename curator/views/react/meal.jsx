import React from 'react'
import PropTypes from 'prop-types'
import $ from 'jquery'
const date = require('../../../tools/date.js')()
const globals = require('../../../tools/globals.js')
const _ = require('underscore')
const ajx = require('../../../tools/ajax.js')()

class Meal extends React.Component {
  
  constructor(props) {
    super(props)
    const {meal} = this.props
    this.state = {
      meal: _.extend({
        name: '',
        price: 0,
        image: '',
        description: ''
      },meal)
    }
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
    const meal = this.state.meal
    meal[name] = value
    this.setState({meal})
  }

  handleSubmit() {
    // console.log(this.state.meal, this.props.meal)
    ajx.call({
      method: "POST",
      url: this.props.meal ? '/edit_meal' : '/add_meal',
      data: this.state.meal,
      success: (data) => {alert("Successfully inserted " + data)}
    })
  }

  render() {
    let {name, price, image, description, _restaurant} = this.state.meal
    return (
      <div>
        <label> Restaurant: </label>
        <select onChange={this.handleChange.bind(this)} name="_restaurant" className="form-control" value={_restaurant}>
          {_.map(this.state.restaurants, (restaurant, j) => <option value={restaurant._id} key={j}>{restaurant.name}</option>)}
        </select>
        <label> Name:</label>
        <input value={name} type="text" onChange={this.handleChange.bind(this)} name="name" className="form-control"/>
        <label> Price: </label>
        <input value={price} type="text" onChange={this.handleChange.bind(this)} name="price" className="form-control"/>
        <label> Image url: </label>
        <input value={image} type="text" onChange={this.handleChange.bind(this)} name="image" className="form-control"/>
        <label> Description: </label>
        <textarea value={description} onChange={this.handleChange.bind(this)} name="description" className="form-control"/>
        <input type="submit" value="Submit" className="form-control" onClick={this.handleSubmit.bind(this)}/>
      </div>
    )
  }
}

Meal.propTypes = {
    meal: PropTypes.object
}

module.exports = Meal
