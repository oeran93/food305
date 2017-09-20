import React from 'react'
import $ from 'jquery'
const date = require('../../../tools/date.js')()
const globals = require('../../../tools/globals.js')
const _ = require('underscore')
const ajx = require('../../../tools/ajax.js')()
const {Modal} = require('react-bootstrap')
const Meal = require('./meal.jsx')

class Stations_schedule extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      restaurants: [],
      adding_meal: false,
      adding_restaurant: false
    }
  }
  
  toggle_modal (modal) {
    const state = this.state
    state[modal] = !this.state[modal]
    this.setState(state)
  }

  handleChange (event) {
    const target = event.target
    const res = target.name[0]
    const meal = target.name[2]
    const restaurants = this.state.restaurants
    restaurants[res].meals[meal].hidden = !restaurants[res].meals[meal].hidden
    this.setState({restaurants})

    ajx.call({
      method: "POST",
      url: '/manage_restaurants',
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
    let {restaurants,adding_meal} = this.state
    return (
      <div>
        <button className="btn btn-success" onClick={() => this.toggle_modal.bind(this)('adding_meal')}>Add Meal</button>
        <Modal show={adding_meal} onHide={() => this.toggle_modal.bind(this)('adding_meal')}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <Meal />
          </Modal.Body>
        </Modal>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Restaurant</th>
              <th>Meals</th>
            </tr>
          </thead>
          <tbody>
            {_.map(restaurants, (restaurant, i) => {
              const meals = restaurant.meals
              return (
                <tr key={i}>
                  <td>
                    <p>{restaurant.name}</p>
                  </td>
                  {_.map(meals, (meal, j) => {
                    var count = 0
                    var sum = 0
                    _.map(meal.orders, (order) => {
                      if (order.rating){
                        count++
                        sum += order.rating
                      }
                    })
                    const avg_rating = isNaN(sum/count) ? "" : sum/count
                    return (
                      <td className="col-xs-2" key={j}>
                        <input
                          name={[i,j]}
                          type="checkbox"
                          checked={!this.state.restaurants[i].meals[j].hidden}
                          onChange={this.handleChange.bind(this)} />
                        <p>{meal.name}</p>
                        <button className="btn btn-warning" onClick={() => {
                          const state = this.state
                          state[meal._id] = true
                          this.setState(state)
                        }} >Edit</button>
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
                        <label>Rating: {avg_rating}</label>
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }

}
module.exports = Stations_schedule
