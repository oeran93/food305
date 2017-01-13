const React = require('react')
const date  = require('../../../tools/date.js')

module.exports = React.createClass({

  getInitialState: function () {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0
    }
  },

  componentWillMount: function () {
    setInterval(this.end_of_this_order,1000)
  },

  end_of_this_order: function () {
    let time = date.time_until_order_closed()
    this.setState({
      hours: Math.trunc(time.asHours()),
      minutes: Math.trunc(time.asMinutes()%60),
      seconds: Math.trunc(time.asSeconds()%60)
    })
  },

  render: function() {
    let {hours, minutes, seconds} = this.state
    let day = hours > 10 ? 'tomorrow' : 'today'
    return (
      <div id='banner'>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="countdown">
                <h1>Buy now for {day}'s lunch</h1>
                <h5>Sale ends in</h5>
                <div id="clockdiv">
                  <div>
                    <span className="hours">{hours}</span>
                    <div className="smalltext">Hours</div>
                  </div>
                  <div>
                    <span className="minutes">{minutes}</span>
                    <div className="smalltext">Minutes</div>
                  </div>
                  <div>
                    <span className="seconds">{seconds}</span>
                    <div className="smalltext">Seconds</div>
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