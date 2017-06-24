const React = require('react')

module.exports = function (props) {
  return (
    <div className="row">
      <div className="col-xs-12 text-center text-uppercase">
        <h3>Pickup Information</h3>
      </div>
      <div className="col-xs-12 payment_info">
        <h4>
          <span className="fa fa-map-marker margin-right-5"></span> Pick up your food at {props.station}
        </h4>
        <h4>
          <span className="fa fa-calendar-o margin-right-5"></span> Your food will be delivered at {props.delivery_hour} on {props.delivery_day}
        </h4>
        <h4>
          <span className="fa fa-credit-card margin-right-5"></span> Your total is <span className="green-label"> $ {props.amount} </span>
        </h4>
      </div>
      <div className="col-xs-12">
        <button className='btn red-btn pull-right margin-right-5' onClick={() => props.change_step({step: 1})}>
          Ok, I got it
        </button>
      </div>
    </div>
  )
}
