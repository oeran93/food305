const Station = require('../../database/station.js')
const Meal = require('../../database/meal.js')
const Restaurant = require('../../database/restaurant.js')
const errors = require('../../tools/errors.js')

module.exports = function () {

  let pub = {}

  pub.change_schedule = function (req, res) {
    const station = req.body
    Station.update(
      { _id: station._id }
      ,{ $set: { schedule: station.schedule }}
      ,(err) => {
        if (err) throw error
        else res.send("success")
      }
    )
  }

  return pub
}
