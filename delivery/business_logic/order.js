const Meal  = require('../../database/meal.js')
const Order = require('../../database/order.js')
const twilio = require('../../tools/twilio.js')()
const date = require('../../tools/date.js')()

module.exports = function () {

  let pub = {}

  /*
  * Adds an order for a user
  */
  pub.add = function (req,res) {
    var order = new Order({
      _meal: req.body.meal._id,
      _user: req.session.user._id,
      date: req.body.date
    })
    order.save((err) => {
      if (err) { throw err}
      Meal.update(
        {_id: req.body.meal},
        {$push: {'orders': order._id}},
        () => {
          let day = date.to_moment(req.body.date).format("dddd")
          let hour = date.to_moment(req.body.date).format("hh a")
          twilio.send_sms(req.session.user.phone,
            `Your ${req.body.meal.name} is on its way. It will be delivered on ${day} at ${hour}`)
          res.sendStatus(200)
        }
      )
    })
  }

  /*
  * Gets all upcoming orders for a user.
  */
  // pub.get_future_orders = function (req, res) {
  //   Meal
  //   .find()
  //   .populate({
  //     path: 'orders',
  //     match: {date: {'$gte': req.query.date}, _user: {'$eq': req.session.user._id}}
  //   })
  //   .exec((err, meals) => {
  //     meals = meals.filter( m => m.orders.length)
  //     res.send(meals)
  //   })
  // }

  return pub

}
