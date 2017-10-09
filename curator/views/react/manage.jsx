import React from 'react'
import $ from 'jquery'
import Edit_Restaurants_And_Meals from './edit_restaurants_and_meals.jsx'
import Station_Schedule from './station_schedule.jsx'
const date = require('../../../tools/date.js')()
const globals = require('../../../tools/globals.js')
const _ = require('underscore')
const ajx = require('../../../tools/ajax.js')()

class Manage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      station: null
    }
  }

  componentWillMount() {
    ajx.call({
      method: "GET",
      url: '/get_station',
      success: (station) => this.setState({station})
    })
  }

  render() {
    let {station} = this.state
    if (!station) return null
    const delivery_date = date.this_delivery().format(globals.day_date_format)
    const day_of_week = date.this_delivery().day() - 1
    const meals = station.schedule[day_of_week].meals
    return (
      <div>
        <h1>Menu at {station.location} on {delivery_date}</h1>
        {_.map(meals, meal => (<li key={meal._id}> {meal.name} </li>))}
        <hr />
        <Station_Schedule />
        <br/><hr />
        <Edit_Restaurants_And_Meals station={station}/>
        <hr />
      </div>
    )
  }

}
module.exports = Manage
