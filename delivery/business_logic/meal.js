const Restaurant = require('../../database/restaurant.js')
const Order      = require('../../database/order.js')
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
        path: 'meals'
      })
      .exec((err, restaurants) => {
        restaurants = restaurants.filter(r => !_.contains(r.closed,date.week_day()))
        res.send(restaurants)
      })
  }

  pub.get_my_meals = function (req, res) {
    Order
      .find({
        _user: req.user.id,
        date: {'$eq': req.query.date}
      })
      .populate({
        path: '_meal',
        populate: {
          path: 'orders',
          match: {date: {'$eq': req.query.date}}
        }
      }).exec((err, orders) => {
        res.send(orders.map(order => {
          return order._meal
        }))
      })
  }

  return pub
  

}
