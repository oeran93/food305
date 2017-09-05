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
    return (
      <div>
        <h1>Schedule of stations</h1>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Station</th>
              <th>Schedule</th>
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
                        <div className="dropdown">
                          <a href="#" data-toggle="dropdown" className="dropdown-toggle">
                            {restaurant.name}
                            <b className="caret"></b>
                          </a>
                          <ul className="dropdown-menu">
                            {_.map(restaurants, (restaurant, j) => {
                              return (
                                <li key={j}>
                                  <a href="#">{restaurant.name}</a>
                                </li>
                              )
                            })}
                          </ul>
                        </div>
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
