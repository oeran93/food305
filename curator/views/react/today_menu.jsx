import React from 'react'
const date = require('../../../tools/date.js')()
const globals = require('../../../tools/globals.js')

module.exports = function(props) {
  const delivery_date = date.this_delivery().format(globals.day_date_format)
  return (
    <div className="row">
      <div className="col-xs-12 text-center section-title">
        <h1>Menu for {delivery_date} </h1>
      </div>
      <div className="col-xs-12">
        {props.meals.map(meal => {
          if (!meal.hidden) return <li key={meal._id}> {meal.name} </li>
        })}
      </div>
    </div>
  )
}
