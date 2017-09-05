const Station = require('../../database/station.js')
const Meal = require('../../database/meal.js')
const Restaurant = require('../../database/restaurant.js')
const errors = require('../../tools/errors.js')

module.exports = function () {

  let pub = {}

  pub.add_meal = function (req, res) {
    const haha = "hahaha"
    Station.find({})
      .populate({
        path: 'schedule',
        populate: { path: 'meals' }
      })
      .exec((err, stations) => {
        if (err) res.send({error: errors.generic})
        else res.send(haha)
      })
  }

  return pub
}
