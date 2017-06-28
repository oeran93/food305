import React from 'react'
import Tooltip from '../tooltip.jsx'

module.exports = function (props) {
  let {price, taxes_fees, total} = props
  return (
    <div>
      <div className="row">
        <div className="col-xs-12">
          <h4>Price: $ {price} </h4>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <h4>Taxes & Fees: $ {taxes_fees} <Tooltip tooltip="Restaurant Sales taxes (about 10%). Credit Card fees, 2.9% + $ 0.30">
                <span className="fa fa-question-circle-o"></span>
            </Tooltip>
          </h4>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <h4>Delivery Fees: $ 0 </h4>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <h4 className="green-label">Total: $ {total}</h4>
        </div>
      </div>
    </div>
  )

}
