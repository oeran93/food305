const React = require('react')
const date  = require('../../../tools/date.js')()

module.exports = React.createClass({

  getInitialState: function () {
    return {
      date: date.this_order_delivery(),
      hours: 0,
      minutes: 0,
      seconds: 0
    }
  },

  componentDidMount: function () {
    setInterval(this.end_of_this_order,1000)
  },

  end_of_this_order: function () {
    let time = date.time_to_next_order()
    this.setState({
      hours: Math.trunc(time.asHours()),
      minutes: Math.trunc(time.asMinutes()%60),
      seconds: Math.trunc(time.asSeconds()%60)
    })
  },

  render: function() {
    let {date, hours, minutes, seconds} = this.state
    return (
      <div id='banner'>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="countdown">
                <h1 className='adv free-delivery text-uppercase'>Free Delivery</h1>
                <h2 className='adv buy-now-for text-uppercase'>Buy now for {date.format('dddd')}'s lunch</h2>
                <h5 className='adv sale-ends text-uppercase'>Sale ends in</h5>
                <div id="clockdiv">
                  <div>
                    <span className="hours">{hours}</span>
                  </div>
                  <div>
                    <span className="minutes">{minutes}</span>
                  </div>
                  <div>
                    <span className="seconds">{seconds}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

})