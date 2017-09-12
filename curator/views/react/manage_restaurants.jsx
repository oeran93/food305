import React from 'react'
import $ from 'jquery'
const date = require('../../../tools/date.js')()
const globals = require('../../../tools/globals.js')
const _ = require('underscore')
const ajx = require('../../../tools/ajax.js')()

class Stations_schedule extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  handleChange(event) {
    const target = event.target
    const res = target.name[0]
    const meal = target.name[2]
    this.state.restaurants[res].meals[meal].hidden = !this.state.restaurants[res].meals[meal].hidden
    this.forceUpdate()

    ajx.call({
      method: "POST",
      url: '/manage_restaurants',
      data: this.state.restaurants[res].meals[meal],
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
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Restaurant</th>
              <th>Schedule</th>
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
                          onChange={this.handleChange} />
                        <p>{meal.name}</p>
                        <label>{avg_rating}</label>
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
