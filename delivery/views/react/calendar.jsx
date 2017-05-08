import React from 'react'
import PropTypes from 'prop-types'
import $ from 'jquery'

class Calendar extends React.Component {

  constructor (props) {
    super(props)
  }

  componentDidMount () {

  }

  handleClick (event) {
    $('.timeslot').removeClass('clicked')
    $(event.target).toggleClass('clicked')
  }

  render () {
    return (
      <div className="col-xs-12 calendar">
        <div className="row">
          <div className="col-xs-6">
            <div className="timeslot" onClick={this.handleClick.bind(this)}>
              12:30 PM
            </div>
          </div>
          <div className="col-xs-6">
            <div className="timeslot" onClick={this.handleClick.bind(this)}>
              1:30 PM
            </div>
          </div>
        </div>
      </div>
    )
  }

}

Calendar.propTypes = {
  meal_id: PropTypes.number,
  station_id: PropTypes.number
}

module.exports = Calendar
