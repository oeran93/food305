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
    const value = target.value
    const station = target.name[0]
    const restaurant = target.name[2]
    this.state.stations[station].schedule[restaurant] = this.state.all_restaurants[value]
    this.forceUpdate()

    ajx.call({
      method: "POST",
      url: '/change_schedule',
      data: this.state.stations[station],
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
                      console.log(order)
                      if (order.rating){
                        count++
                        sum += order.rating
                      }
                    })
                    const avg_rating = isNaN(sum/count) ? "" : sum/count
                    return (
                      <td className="col-xs-2" key={j}>
                        <p>{meal.name}</p>
                        <label>{avg_rating}</label>
                          <input
                            name={meal.name}
                            type="checkbox"
                            checked={meal.hidden}
                            onChange={this.handleChange} />
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
