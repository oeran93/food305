import React from 'react'
import PropTypes from 'prop-types'
import Tooltip from './tooltip.jsx'
const ajx = require('../../../tools/ajax.js')()
const date = require('../../../tools/date.js')()
const format = require('../../../tools/format.js')

class Info_Bar extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      station: ""
    }
  }

  componentWillMount () {
    ajx.call({
      method: "get",
      url: "/get_station",
      success: ({location}) => {
        this.setState({station: location})
      }
    })
  }

  render () {
    const {restaurant, meals} = this.props
    const {station} = this.state
    const meals_ordered = meals.filter(m => m.orders.length)
    const todaysrestaurant = `${date.get_day_of_week(date.this_order_delivery())}'s food comes from ${restaurant.name}`
    const deliverytime = `If you order now your food will be delivered ${date.get_day_of_week(date.this_order_delivery())} at ${date.this_order_delivery().format('hh:mm a')}`
    const deliverystation = `Your order will be delivered to ${station}`
    const orderssummary = meals_ordered.reduce( (orders, m) => {
        return orders + `- You have ${m.orders.length} ${m.name} coming ${date.get_day_of_week(date.order_date_to_moment(m.orders[0].date))} \n\n`
    }, "")
    const num_meal = meals_ordered.length
    return (
      <div className="container-fluid info-bar">
        <div className="row">
          <div className="center-container">
            <div className="col-xs-12 col-sm-6 col-md-3">
              <div className="row component">
                <div className="col-xs-2"><span className="fa fa-home fa-3x"></span></div>
                <div className="col-xs-10"><Tooltip tooltip={todaysrestaurant}><span title={todaysrestaurant} className="text"> { format.ellipses(todaysrestaurant, 60) }</span></Tooltip></div>
              </div>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-3">
              <div className="row component">
                <div className="col-xs-2"><span className="fa fa-clock-o fa-3x"></span></div>
                <div className="col-xs-10"><Tooltip tooltip={deliverytime}><span title={deliverytime} className="text"> { format.ellipses(deliverytime, 60) } </span></Tooltip></div>
              </div>   
            </div>
            <div className="col-xs-12 col-sm-6 col-md-3">
              <div className="row component">
                <div className="col-xs-2"><span className="fa fa-location-arrow fa-3x"></span></div>
                <div className="col-xs-10"><Tooltip tooltip={deliverystation}><span title={deliverystation} className="text"> { format.ellipses(deliverystation, 60) } </span></Tooltip></div>
              </div>   
            </div>
            <div className="col-xs-12 col-sm-6 col-md-3">
              <Tooltip tooltip={orderssummary}>
                <div className="row component" style={orderssummary ? {color: "#2ecc71"} : {}}>
                    <div className="col-xs-2"><span className="fa fa-flag fa-3x"></span></div>
                    <div className="col-xs-10"><span className="text"> 
                      {orderssummary ? "You have " + num_meal + " orders awaiting delivery. Hover to see them" : "We did not receive your order yet" } 
                    </span></div>
                </div>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Info_Bar.propTypes = {
  restaurant: PropTypes.object.isRequired,
  meals: PropTypes.array.isRequired
}

module.exports = Info_Bar
