const Station = require('../../database/station.js')
const Meal = require('../../database/meal.js')
const Restaurant = require('../../database/restaurant.js')
const errors = require('../../tools/errors.js')

module.exports = function () {

  let pub = {}

  pub.add_restaurant = function (req, res) {
    const new_res = req.body
    const restaurant = new Restaurant({
      name: new_res.name,
      phone: new_res.phone,
      closed: new_res.price,
      max_meals: 30,
      meals: []
    })

    restaurant.save( (err, saved_res) => {
      if (err) throw error
      else {
        res.send(saved_res.name)
      }
    })
  }

  return pub
}
