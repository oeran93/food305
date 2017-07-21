import React from 'react'
import $ from 'jquery'
const date = require('../../../tools/date.js')()
const globals = require('../../../tools/globals.js')
const _ = require('underscore')

class Stations_today extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      stations: []
    }
  }

  componentWillMount() {
    $.get("/stations_today", (stations) => {
      this.setState({stations})
    })
  }

  render() {
    let {stations} = this.state
    const delivery_date = date.this_delivery().format(globals.order_date_format).slice(0, -6)
    const day_of_week = date.this_delivery().day() - 1
    return (
      <div>
        <h1>Menu on {delivery_date}</h1>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Station</th>
              <th>Meals
              </th>
            </tr>
          </thead>
          <tbody>
            {_.map(stations, (station, i) => {
              const meals = station.schedule[day_of_week].meals
              return (
                <tr key={i}>
                  <td>
                    <p>{station.location}</p>
                  </td>
                  {_.map(meals, (meal, j) => {
                    const img_url = "../../../shared/images/meals/" + meal.image
                    if (!meal.hidden) {
                      return (
                        <td className="col-xs-2" key={j}>
                          <img src={img_url}/>
                          <p>{meal.name}</p>
                        </td>
                      )
                    }
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
module.exports = Stations_today
