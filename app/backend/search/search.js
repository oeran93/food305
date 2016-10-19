var Restaurant = require('../database/restaurant.js')
var Meal = require('../database/meal.js')
var Order = require('../database/order.js')
var _ = require('underscore')

var Search = function () {
  var getOrderDate = () => {
    var today = new Date()
    var orderDate = today.setHours(12)
    if (today.getHours() + 2 >= 11) {
      orderDate = orderDate + 1
    }
    return orderDate
  }

  return {
    getAll: function (req, res) {
      Restaurant
        .find()
        .populate({
          path: 'meals',
          populate: {path: 'orders'}
        })
        .exec((err, restaurants) => {
          res.send(restaurants)
        })
    },

    addOrder: function (req, res) {
      var order = new Order({
        _meal: req.body.meal,
        date: getOrderDate()
      })
      order.save((err) => {
        if (err) { throw err}
        Meal.update(
          {_id: req.body.meal},
          {$push: {'orders': order._id}},
          {},
          () => {
            res.sendStatus(200)}
        )
      })
    }

  }
}

module.exports = Search
