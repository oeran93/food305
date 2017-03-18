const Restaurant = require('../../database/restaurant.js')
const Meal       = require('../../database/meal.js')
const date       = require('../../tools/date.js')()
const _          = require('underscore')

module.exports = function () {

  let pub = {}

  /*
  * Returns all meals of restaurants opened today
  */
  pub.get_available_meals = function (req, res) {
    Restaurant
      .find()
      .populate({
        path:'meals'
      })
      .exec((err, restaurants) => {
        restaurants = restaurants.filter(r => !_.contains(r.closed,date.this_order_delivery().format('dddd').toLowerCase()))
        res.send(restaurants)
      })
  }

  pub.get_my_meals = function (req, res) {
    Meal
    .find()
    .populate({
      path: 'orders',
      match: {date: {'$eq': req.query.date}, _user: {'$eq': req.session.user._id}}
    })
    .exec((err, meals) => {
      meals = meals.filter( m => _.size(m.orders))
      res.send(meals)
    })
  }

  return pub
  

}
