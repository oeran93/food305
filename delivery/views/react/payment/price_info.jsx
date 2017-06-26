import React from 'react'

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
          <h4>Taxes & Fees: $ {taxes_fees} </h4>
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
