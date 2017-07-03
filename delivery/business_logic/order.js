const Meal  = require('../../database/meal.js')
const Order = require('../../database/order.js')
const send = require('../../notification_center/send.js')
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
          let meal_name = req.body.meal.name
          send(req.session.user).message('successful_order', {meal_name,day,hour}).text_and_email()
          res.sendStatus(200)
        }
      )
    })
  }

  return pub

}
