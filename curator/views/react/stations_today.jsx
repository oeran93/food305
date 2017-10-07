import React from 'react'
import $ from 'jquery'
const date = require('../../../tools/date.js')()
const globals = require('../../../tools/globals.js')
const _ = require('underscore')
const ajx = require('../../../tools/ajax.js')()

class Stations_today extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      stations: []
    }
  }

  componentWillMount() {
    ajx.call({
      method: "GET",
      url: '/stations_today',
      success: (stations) => this.setState({stations})
    })
  }

  render() {
    let {stations} = this.state
    const delivery_date = date.this_delivery().format(globals.day_date_format)
    const day_of_week = date.this_delivery().day() - 1
    return (
      <div>
        <h1>Menu on {delivery_date}</h1>
        {_.map(stations, station => {
          const meals = station.schedule[day_of_week].meals
          return (<ul key={station._id}>
            <h2>{station.location}</h2>
            {_.map(meals, meal => (<li key={meal._id}> {meal.name} </li>))}
          </ul>)
        })}
      </div>
    )
  }

}
module.exports = Stations_today
