const Station = require('../../database/station.js')
const Meal = require('../../database/meal.js')
const Order = require('../../database/order.js')
const Restaurant = require('../../database/restaurant.js')
const errors = require('../../tools/errors.js')
const _ = require('underscore')

module.exports = function () {

  let pub = {}
  
  pub.get_restaurants = function (req, res) {
    Restaurant.find({})
      .sort({created_at: -1})
      .populate({
        path: 'meals',
        populate: { path: 'orders' }
      })
      .exec((err, restaurants) => {
        if (err) res.send({error: errors.generic})
        else {
          restaurants.forEach( (res, index) => {
            var count = 0
            var sum = 0
            _.map(res.meals, (meal) =>{
              _.map(meal.orders, (order) => {
                if (order.rating){
                  count++
                  sum += order.rating
                }
              })
            })
            const avg_rating = isNaN(sum/count) ? "" : sum/count
            restaurants[index] = restaurants[index].toObject()
            restaurants[index]["rating"] = isNaN(sum/count) ? "" : avg_rating.toFixed(2)
          })
          res.send(restaurants)
        }
      })
  }

  pub.add_restaurant = function (req, res) {
    const restaurant = new Restaurant({
      name: req.body.name,
      phone: req.body.phone,
      closed: req.body.price,
      max_meals: 20,
      meals: []
    })
    restaurant.save((err, saved_res) => {
      if (err) throw error
      else res.send(saved_res.name)
    })
  }

  return pub
}
