import React from 'react'
import $ from 'jquery'
const date = require('../../../tools/date.js')()
const globals = require('../../../tools/globals.js')
const _ = require('underscore')

class Orders extends React.Component {

  constructor (props) {
    super(props)
    let current_date = date.this_delivery().format(globals.order_date_format).slice(0,-6)
    this.state = {
      orders: [],
      shown_date: current_date
    }
  }

  componentWillMount () {
    $.get("/delivery_orders?date=" + this.state.shown_date, (data) => {
      this.setState({orders: data})
    })
  }

  count_orders (orders) {
    let count = {}
    _.each(orders, (order) => {
      let meal = order.meal
      count[meal] = count[meal]
        ? count[meal] + 1
        : 1
    })
    return count
  }

  handle_date_change(event){
    let chosen_date = event.target.value + " 12:00"
    $.get("/delivery_orders?date=" + chosen_date, (data) => {
      this.setState({orders: data})
    })
  }

  render () {
    let {orders} = this.state
    let count = this.count_orders(orders)
    return (
      <div>
          <div className="input-group">
            <input type="text" className="form-control" defaultValue={this.state.shown_date} onChange={this.handle_date_change.bind(this)} />
          </div>
        <h2>Orders per Meal Type</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Meal</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {
             _.map(count, (amount, meal) => {
              return (
                <tr key={meal}>
                  <td>
                    <p>{meal}</p>
                  </td>
                  <td>
                    <p>{amount}</p>
                  </td>
                </tr>
              )
            })
           }
          </tbody>
        </table>
        <h2>Orders per User</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Meal</th>
              <th>User</th>
              <th>Phone</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {
             _.map(orders, (order, i) => {
              return (
                <tr key={i}>
                  <td>
                    <p>{order.meal}</p>
                  </td>
                  <td>
                    <p>{order.user}</p>
                  </td>
                  <td>
                    <p>{order.phone}</p>
                  </td>
                  <td>
                    <p>{order.email}</p>
                  </td>
                </tr>
              )
            })
          }
          </tbody>
        </table>
      </div>
    )
  }
}

module.exports = Orders
