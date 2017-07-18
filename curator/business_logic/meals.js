const Order = require('../../database/order.js')
const Meal = require('../../database/meal.js')
const errors = require('../../tools/errors.js')

module.exports = function () {

  let pub = {}

  pub.get_num_orders_by_meal = function (req, res) {
    Meal.find({})
      .exec((err, meals) => {
        if (err) res.send({error: errors.generic})
        else res.send(meals)
      })
  }

  return pub

}
