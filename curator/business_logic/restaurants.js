const Order = require('../../database/order.js')
const Restaurant = require('../../database/restaurant.js')

module.exports = function () {

  let pub = {}

  /*
  * Returns an array of all restaurants with a property orders containing the total
  * number of meals ordered from that restaurant
  */
  pub.get_num_orders_by_restaurant = function (req, res) {
    Restaurant.find({})
      .populate({path: 'meals'})
      .lean()
      .exec((err, restaurants) => {
        if (err) res.send({error: errors.generic})
        else {
          restaurants.forEach((r,i) => {
            restaurants[i].orders = r.meals.reduce((sum,meal) => sum + (meal.orders ? meal.orders.length : 0), 0)
          })
          res.send(restaurants)
        }
      })
  }

  return pub

}
