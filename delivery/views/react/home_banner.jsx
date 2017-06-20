import React, { PropTypes } from 'react'
const date  = require('../../../tools/date.js')()

class Home_Banner extends React.Component {

  render () {
    return (
      <div className="home-banner banner text-center text-uppercase">
        <div className="row">
        <h2 className="title col-xs-12">Order now for {date.get_day_of_week(date.this_delivery())}</h2>
        </div>
      </div>
    )
  }

}

module.exports = Home_Banner
