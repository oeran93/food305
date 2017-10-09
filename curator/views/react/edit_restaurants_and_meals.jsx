import React from 'react'
import $ from 'jquery'
const date = require('../../../tools/date.js')()
const globals = require('../../../tools/globals.js')
const _ = require('underscore')
const ajx = require('../../../tools/ajax.js')()
const {Modal} = require('react-bootstrap')
const Meal = require('./meal.jsx')

class Edit_Restaurants_And_Meals extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      restaurants: [],
    }
  }

  handleChange (event) {
    const target = event.target.name.split(',')
    const res = target[0]
    const meal = target[1]
    const restaurants = this.state.restaurants
    restaurants[res].meals[meal].hidden = !restaurants[res].meals[meal].hidden
    this.setState({restaurants})
    ajx.call({
      method: "POST",
      url: '/change_meal_visibility',
      data: restaurants[res].meals[meal],
      success: (data) => {console.log(data)}
    })

  }

  componentWillMount() {
    ajx.call({
      method: "GET",
      url: '/get_restaurants',
      success: (restaurants) => this.setState({restaurants})
    })
  }

  render() {
    let {restaurants} = this.state
    return (
      <div>
        {_.map(restaurants, (rest, i) => {
          return (
            <div key={rest.name}>
              <div className="col-xs-12">
                <h1>{rest.name}</h1>
              </div>
              {_.map(rest.meals, (meal,j) => {
                const sum_ratings = _.reduce(meal.orders, (sum, o) => sum + (o.rating ? o.rating : 0), 0)
                const num_ratings = _.reduce(meal.orders, (sum, o) => o.rating ? sum+1 : sum, 0)
                const avg_rating = num_ratings ?  sum_ratings / num_ratings : 'N/A'
                return (
                  <div key={j} className="col-xs-12 meal-row">
                    <div className="row">
                      <div className="col-xs-12 col-sm-3">
                        <input
                          name={[i,j]}
                          type="checkbox"
                          checked={!this.state.restaurants[i].meals[j].hidden}
                          onChange={this.handleChange.bind(this)} /> {meal.name}
                      </div>
                      <div className="col-xs-12 col-sm-1">
                        <button className="btn btn-warning" onClick={() => {
                          const state = this.state
                          state[meal._id] = true
                          this.setState(state)
                        }} >Edit</button>
                      </div>
                      <div className="col-xs-12 col-sm-2">
                        <label>Rating: {avg_rating ? avg_rating : 'N/A'}</label>
                      </div>
                      <div className="col-xs-12 col-sm-2">
                        <label>Num Ratings: {num_ratings} </label>
                      </div>
                    </div>
                    <Modal show={this.state[meal._id]} onHide={() => {
                      const state = this.state
                      state[meal._id] = false
                      this.setState(state)
                    }}>
                      <Modal.Header closeButton></Modal.Header>
                      <Modal.Body>
                        <Meal meal={meal}/>
                      </Modal.Body>
                    </Modal>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    )
  }
}

module.exports = Edit_Restaurants_And_Meals
