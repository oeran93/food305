const React = require('react')

module.exports = function (props) {
  return (
    <div className="row">
      <div className="col-xs-12 text-center text-uppercase">
        <h2>Pickup Information</h2>
      </div>
      <div className="col-xs-12 payment">
        <div className="row">
          <div className="col-xs-1"><span className="fa fa-map-marker"></span></div>
          <div className="col-xs-11">Pick up your food at {props.station}</div>
        </div>
        <div className="row">
          <div className="col-xs-1"><span className="fa fa-calendar-o"></span></div>
          <div className="col-xs-11">Your food will be delivered at {props.delivery_hour} on {props.delivery_day}</div>
        </div>
      </div>
      <div className="col-xs-12">
        <button className='btn red-btn pull-right margin-right-5' onClick={() => props.change_step({step: 1})}>
          Ok, I got it
        </button>
      </div>
    </div>
  )
}
