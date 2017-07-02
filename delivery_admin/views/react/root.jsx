import React from 'react'
import $ from 'jquery'
const date = require('../../../tools/date.js')()
const globals = require('../../../tools/globals.js')

class Root extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      orders: [],
    }
  }

  componentWillMount () {
    console.log(date.this_delivery().format(globals.order_date_format))
    $.get("/delivery_orders?date="+date.this_delivery().format(globals.order_date_format), (data) => {
      this.setState({orders:data})
    })
  }

  render () {
    let {orders} = this.state
    return (
      <div className="container-fluid">
        <div className="page-header">
          <h1>People Service</h1>
        </div>
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
module.exports = Root
