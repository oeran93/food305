var React = require('react')
var date = require('../../tools/date.js')

var Banner = React.createClass({

	getInitialState: function () {
		return {
			hours: 0,
      minutes: 0,
      seconds: 0
		}
	},

	componentWillMount: function () {
		setInterval(this.endOfThisOrder,1000)
	},

	endOfThisOrder: function () {
    var time = date.timeUntilOrderClosed()
    this.setState({
      hours: Math.trunc(time.asHours()),
      minutes: Math.trunc(time.asMinutes()%60),
      seconds: Math.trunc(time.asSeconds()%60)
    })
  },

	render: function() {
		var {hours,minutes,seconds} = this.state
    var day = hours > 10 ? 'tomorrow' : 'today'
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

module.exports = Banner