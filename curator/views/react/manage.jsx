import React from 'react'
import Edit_Restaurants_And_Meals from './edit_restaurants_and_meals.jsx'
import Station_Schedule from './station_schedule.jsx'
import Today_Menu from './today_menu.jsx'
const ajx = require('../../../tools/ajax.js')()
const date = require('../../../tools/date.js')()

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
    const day_of_week = date.this_delivery().day() - 1
    return (
      <div>
        <Today_Menu meals={station.schedule[day_of_week].meals}/><hr />
        <Station_Schedule /><hr />
        <Edit_Restaurants_And_Meals station={station}/><hr />
      </div>
    )
  }

}
module.exports = Manage
