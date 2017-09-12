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
      stations: [],
      all_restaurants: []
    }
  }

  handleChange(event) {
    const target = event.target
    const res_id = target.value
    const station = target.name[0]
    const restaurant = target.name[2]
    const stations = this.state.stations
    stations[station].schedule[restaurant] = res_id
    this.setState({stations})

    ajx.call({
      method: "POST",
      url: '/change_schedule',
      data: stations[station],
      success: (data) => {console.log(data)}
    })
  }

  componentWillMount() {
    ajx.call({
      method: "GET",
      url: '/stations_schedule',
      success: (stations) => this.setState({stations})
    })

    ajx.call({
      method: "GET",
      url: '/get_restaurants',
      success: (all_restaurants) => this.setState({all_restaurants})
    })
  }

  render() {
    let {stations, all_restaurants} = this.state
    return (
      <div>
        <h1>Schedule of stations</h1>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Station</th>
              <th>Monday</th><th>Tuesday</th><th>Wednesday</th><th>Thursday</th><th>Friday</th>
            </tr>
          </thead>
          <tbody>
            {_.map(stations, (station, i) => {
              const restaurants = station.schedule
              return (
                <tr key={i}>
                  <td>
                    <p>{station.location}</p>
                  </td>
                  {_.map(restaurants, (restaurant, j) => {
                    return (
                      <td className="col-xs-2" key={j}>
                        <label>{restaurant.name}</label>
                        <select onChange={this.handleChange.bind(this)} value={this.state.stations[i].schedule[j]} name={[i,j]}>
                          {_.map(all_restaurants, (restaurant, j) => {
                              return (
                                <option value={restaurant._id} key={j}>{restaurant.name}</option>
                              )
                            })}
                        </select>

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
