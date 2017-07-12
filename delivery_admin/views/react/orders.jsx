import React from 'react'
import $ from 'jquery'
const date = require('../../../tools/date.js')()
const globals = require('../../../tools/globals.js')
const _ = require('underscore')

class Orders extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      orders: []
    }
  }

  componentWillMount () {
    $.get("/delivery_orders?date=" + date.this_delivery().format(globals.order_date_format), (data) => {
      this.setState({orders: data})
    })
  }

<<<<<<< HEAD
  count_orders (orders){
    let count = {}
    for(let i in orders){
      let meal = orders[i].meal
      count[meal] = count[meal] ? count[meal]+1 : 1
    }
=======
  count_orders (orders) {
    let count = {}
    _.each(orders, (order) => {
      let meal = order.meal
      count[meal] = count[meal]
        ? count[meal] + 1
        : 1
    })
>>>>>>> c01414d617aa6915d648538d507ca97153a9cb1f
    return count
  }

  render () {
    let {orders} = this.state
    console.log(orders)
    let count = this.count_orders(orders)
    return (
      <div>
        <h2>Orders per Meal Type</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Meal</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
<<<<<<< HEAD
          {
            Object.keys(count).map((meal,i) => {
              return (
                <tr key={i}>
=======
            {
             _.map(count, (amount, meal) => {
              return (
                <tr key={meal}>
>>>>>>> c01414d617aa6915d648538d507ca97153a9cb1f
                  <td>
                    <p>{meal}</p>
                  </td>
                  <td>
<<<<<<< HEAD
                    <p>{count[meal]}</p>
=======
                    <p>{amount}</p>
>>>>>>> c01414d617aa6915d648538d507ca97153a9cb1f
                  </td>
                </tr>
              )
            })
<<<<<<< HEAD
          }
         </tbody>
=======
           }
          </tbody>
>>>>>>> c01414d617aa6915d648538d507ca97153a9cb1f
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
