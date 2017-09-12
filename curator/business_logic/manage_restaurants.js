const Station = require('../../database/station.js')
const Meal = require('../../database/meal.js')
const Restaurant = require('../../database/restaurant.js')
const errors = require('../../tools/errors.js')

module.exports = function () {

  let pub = {}

  pub.manage_restaurants = function (req, res) {
    const updated_meal = req.body
    Meal.update(
      { _id: meal._id }
      ,{ $set: { hidden: meal.hidden }}
      ,(err) => {
        if (err) throw error
        else res.send("success")
      }
    )
  }

  return pub
}
