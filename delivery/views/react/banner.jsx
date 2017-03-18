const React = require('react')
const date  = require('../../../tools/date.js')().this_order_delivery()

module.exports = React.createClass({

  render: function() {
    return (
      <div id='banner'>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="countdown">
                <h1 className='adv free-delivery text-uppercase'>Free Delivery</h1>
                <h2 className='adv buy-now-for text-uppercase'>Buy now for {date.format('dddd')}'s lunch</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

})