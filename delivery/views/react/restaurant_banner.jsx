const React = require('react')
const date = require('../../../tools/date.js')()

module.exports = function (props) {
  return (
    <div className="container-fluid restaurant-banner banner">
      <div className="row">
        <div className="col-xs-12">
          <h1 className="title text-uppercase text-center">{props.restaurant.name}</h1>
        </div>
        <div className="col-xs-12">
          <h2 className="subtitle text-center">
            {props.restaurant.catch_phrase}
          </h2>
        </div>
        <div className="col-xs-12 text-center text-uppercase">
          <h3 className="subtitle">Order now for {date.get_day_of_week(date.this_order_delivery())}</h3>
        </div>
      </div>
    </div>
  )
}
