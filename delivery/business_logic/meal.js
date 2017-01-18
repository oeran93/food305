var Restaurant = require('../../database/restaurant.js')
var Order = require('../../database/order.js')

module.exports = function () {

  var public = {}

  public.get_all_meals = function (req, res) {
    Restaurant
      .find()
      .populate({
        path: 'meals'
      })
      .exec((err, restaurants) => {
        res.send(restaurants)
      })
  }

  public.get_my_meals = function (req, res) {
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

  return public
  

}
