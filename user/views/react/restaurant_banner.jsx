const React = require('react')
const date = require('../../../tools/date.js')()
const PropTypes = require('prop-types')

class Restaurant_Banner extends React.Component {

    constructor (props) {
      super(props)
      this.state = {
        station: ""
      }
    }

    componentWillMount () {
      $.ajax({
        method: "get",
        url: "/get_station",
        success: ({location}) => {
          this.setState({station: location})
        }
      })
    }

    render () {
      let {restaurant, meals} = this.props
      let {station} = this.state
      let meals_ordered = meals.filter(m => m.orders.length)
      return (
        <div className="container-fluid restaurant-banner banner">
          <div className="row">
            <div className="col-xs-12">
              <h1 className="title text-uppercase text-center">{restaurant.name}</h1>
            </div>
            <div className="col-xs-12 text-center text-uppercase">
              <h3 className="subtitle">Order now for {date.get_day_of_week(date.this_order_delivery())}</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <div className="row">
                <div className="col-xs-12 text-center">
                  <h3 className="order-location">
                    <span className="fa fa-map-marker margin-right-5"></span> Your order will be delivered at {station}
                  </h3>
                </div>
              </div>
              <div className="row">
                {meals_ordered.map( m => {
                  return (
                    <div key={m._id} className="col-xs-12 text-center">
                      <h4>
                        <span className="fa fa-car margin-right-5"></span>
                        You have {m.orders.length} {m.name} coming {date.get_day_of_week(date.to_moment(m.orders[0].date))}
                      </h4>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )
    }
}

Restaurant_Banner.propTypes = {
  restaurant: PropTypes.object.isRequired,
  meals: PropTypes.array.isRequired
}

module.exports = Restaurant_Banner
