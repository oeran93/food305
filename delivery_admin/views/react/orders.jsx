import React from 'react'
import $ from 'jquery'
const date = require('../../../tools/date.js')()
const globals = require('../../../tools/globals.js')

export class Orders extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      orders: []
    }
  }

  componentWillMount () {
    $.get("/delivery_orders?date="+date.this_delivery().format(globals.order_date_format), (data) => {
      this.setState({orders:data})
    })
  }

  count_orders (orders){
    let count = {}
    for(var i in orders){
      let meal = orders[i].meal
      count[meal] = count[meal] ? count[meal]+1 : 1
    }
    return count
  }

  render () {
    let {orders} = this.state
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
          {
            Object.keys(count).map((meal,i) => {
              return (
                <tr key={i}>
                  <td>
                    <p>{meal}</p>
                  </td>
                  <td>
                    <p>{count[meal]}</p>
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
            orders.map((order,i) => {
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
