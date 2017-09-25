import React from 'react'
import $ from 'jquery'
const date = require('../../../tools/date.js')()
const globals = require('../../../tools/globals.js')
const _ = require('underscore')

class Orders extends React.Component {

  constructor (props) {
    super(props)
    let current_date = date.now()
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
    this.setState({shown_date: event.target.value})
    $.get("/delivery_orders?date=" + event.target.value, (data) => {
      this.setState({orders: data})
    })
  }
  
  order_arrived () {
    if (window.confirm('Did you finish setting up the station? Notify users only when you are ready.')) {
      $.post("/order_arrived", {date: this.state.shown_date})
    }
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
        <button className="btn btn-success" onClick={this.order_arrived.bind(this)}> Alert users the food is here </button>
      </div>
    )
  }
}

module.exports = Orders
