import React from 'react'
import $ from 'jquery'

class Restaurants extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      restaurants: []
    }
  }

  componentWillMount () {
    $.get("/num_orders_by_restaurant", (restaurants) => {
      this.setState({restaurants})
    })
  }

  render () {
    let {restaurants} = this.state
    return (
      <div>
        <h1>Restaurants</h1>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Number Orders</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map((restaurant,i) => {
              return (
                  <tr key={i}>
                    <td>
                      <p>{restaurant.name}</p>
                    </td>
                    <td className="col-xs-4">
                      <p>{restaurant.orders}</p>
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
module.exports = Restaurants
