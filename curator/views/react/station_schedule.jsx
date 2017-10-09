import React from 'react'
import $ from 'jquery'
const date = require('../../../tools/date.js')()
const globals = require('../../../tools/globals.js')
const _ = require('underscore')
const ajx = require('../../../tools/ajax.js')()

class Station_schedule extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      schedule: [],
      all_restaurants: []
    }
  }

  handleChange(event) {
    const {schedule} = this.state
    const values = event.target.options[event.target.selectedIndex].value.split(',')
    schedule[values[1]] = values[0]
    this.setState({schedule})
    ajx.call({
      method: "POST",
      url: '/change_station_schedule',
      data: {schedule}
    })
  }

  componentWillMount() {
    ajx.call({
      method: "GET",
      url: '/get_station',
      success: (station) => {
        this.setState({schedule: _.map(station.schedule, r => r._id)})
      }
    })

    ajx.call({
      method: "GET",
      url: '/get_restaurants',
      success: (all_restaurants) => {
        this.setState({all_restaurants})
      }
    })
  }

  render() {
    let {schedule, all_restaurants} = this.state
    return (
      <div>
        <div className="row">
          <h2 className="col-xs-12 col-md-2"> Monday </h2>
          <h2 className="col-xs-12 col-md-2"> Tuesday </h2>
          <h2 className="col-xs-12 col-md-2"> Wednesday </h2>
          <h2 className="col-xs-12 col-md-2"> Thursday </h2>
          <h2 className="col-xs-12 col-md-2"> Friday </h2>
        </div>
        {_.map(schedule, (restaurant, day) => {
          return (
            <div className="col-xs-12 col-md-2" key={day}>
              <select onChange={this.handleChange.bind(this)} value={`${restaurant},${day}`}>
                {_.map(all_restaurants, (r) => <option value={`${r._id},${day}`} key={r._id}> {r.name} {r.rating} </option>)}
              </select>
            </div>
          )
        })}
      </div>
    )
  }
}
module.exports = Station_schedule
