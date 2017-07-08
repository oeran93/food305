import React from 'react'
import $ from 'jquery'
const date = require('../../../tools/date.js')()
const globals = require('../../../tools/globals.js')

class Meals_Stats extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      meals: []
    }
  }

  componentWillMount () {
    $.get("/num_orders_by_meal", (meals) => {
      this.setState({meals})
    })
  }

  render () {
    let {meals} = this.state
    return (
      <div>
        <h1>Meals Stats</h1>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Number Orders</th>
            </tr>
          </thead>
          <tbody>
            {meals.map((meal,i) => {
              return (
                  <tr key={i}>
                    <td>
                      <p>{meal.name}</p>
                    </td>
                    <td className="col-xs-4">
                      <p>{meal.orders.length}</p>
                    </td>
                  </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }

}
module.exports = Meals_Stats
