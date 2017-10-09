import React from 'react'
import PropTypes from 'prop-types'
import $ from 'jquery'
import Select_Input from './select_input.jsx'
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
        description: '',
        tags: [],
        allergens: []
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

  handle_change(event) {
    const target = event.target
    const value = target.value
    const name = target.name
    const meal = this.state.meal
    meal[name] = value
    this.setState({meal})
  }
  
  change_select_box (options,name) {
    let state = this.state
    state[name] = options
    this.setState(state)
  }

  handleSubmit() {
    ajx.call({
      method: "POST",
      url: this.props.meal ? '/edit_meal' : '/add_meal',
      data: this.state.meal,
      success: window.location.reload()
    })
  }

  render() {
    let {name, price, image, description, _restaurant, tags, allergens} = this.state.meal
    return (
      <div>
        <div className="margin-10">
          <label> Restaurant: </label>
          <select onChange={this.handle_change.bind(this)} name="_restaurant" className="form-control" value={_restaurant}>
            {_.map(this.state.restaurants, (restaurant, j) => <option value={restaurant._id} key={j}>{restaurant.name}</option>)}
          </select>
        </div>
        <div className="margin-10">
          <label> Name:</label>
          <input value={name} type="text" onChange={this.handle_change.bind(this)} name="name" className="form-control"/>
        </div>
        <div className="margin-10">
          <label> Price: </label>
          <input value={price} type="text" onChange={this.handle_change.bind(this)} name="price" className="form-control"/>
        </div>
        <div className="margin-10">
          <label> Image url: </label>
          <input value={image} type="text" onChange={this.handle_change.bind(this)} name="image" className="form-control"/>
        </div>
        <div className="margin-10">
          <label> Tags: </label>
          <Select_Input options={['Spicy','Vegetarian']} current_tags={tags} handle_change={(tags) => this.change_select_box(tags,"tags")}/>
        </div>
        <div className="margin-10">
          <label> Allergens: </label>
          <Select_Input options={['Peanuts', 'Fish', 'Shellfish', 'Milk', 'Egg', 'Soy', 'Wheat', 'Tree Nuts']} current_tags={allergens} handle_change={(allergens) => this.change_select_box(allergens,"allergens")}/>
        </div>
        <div className="margin-10">
          <label> Description: </label>
          <textarea value={description} onChange={this.handle_change.bind(this)} name="description" className="form-control"/>
        </div>
        <div className="margin-10">
          <input type="submit" value="Submit" className="form-control" onClick={this.handleSubmit.bind(this)}/>
        </div>
      </div>
    )
  }
}

Meal.propTypes = {
    meal: PropTypes.object
}

module.exports = Meal
