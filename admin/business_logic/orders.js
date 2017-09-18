const date = require('../../tools/date.js')
const Order = require('../../database/order.js')
const Meal = require('../../database/meal.js')
const User = require('../../database/user.js')
const errors = require('../../tools/errors.js')

module.exports = function () {

  let pub = {}

  /*
  * Returns all the orders for a specific delivery date
  * @param req.query.date {String} delivery date
  */
  pub.get_delivery_orders = function (req, res) {
    Order.find({date: {$regex: req.query.date+".*"}})
      .populate('_meal _user')
      .exec((err, orders) => {
        if (err) res.send({error: errors.generic})
        res.send(
         orders.reduce((new_orders,order) => {
           new_orders.push(
          {
            "meal": order._meal.name,
            "user": order._user.name,
            "phone": order._user.phone,
            "email": order._user.email
          })
          return new_orders
        }
          , [])
        )

      })

  }

  return pub

}
