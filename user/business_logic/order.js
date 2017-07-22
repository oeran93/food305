const Meal  = require('../../database/meal.js')
const Order = require('../../database/order.js')
const send = require('../../notification_center/send.js')
const globals = require('../../tools/globals.js')
const errors = require('../../tools/errors.js')
const mongoose = require('mongoose')

module.exports = function () {

  let pub = {}

  /*
  * Adds an order for a user
  */
  pub.add = function (req,res) {
    let station_time_zone = req.session.user.station.time_zone
    let date = require('../../tools/date.js')(station_time_zone)
    let delivery_date = date.this_order_delivery().format(globals.order_date_format)
    var order = new Order({
      _meal: req.body.meal._id,
      _user: req.session.user._id,
      date: delivery_date,
      purchase_time: date.now()
    })
    order.save((err) => {
      if (err) { throw err}
      Meal.update(
        {_id: req.body.meal},
        {$push: {'orders': order._id}},
        () => {
          let day = date.to_moment(delivery_date).format("dddd")
          let hour = date.to_moment(delivery_date).format("hh a")
          let meal_name = req.body.meal.name
          send(req.session.user).message('successful_order', {meal_name,day,hour}).text_and_email()
          res.sendStatus(200)
        }
      )
    })
  }

  /*
  * Returns the most recent order of a user
  */
  pub.get_latest_user_order = function (req, res) {
    let station_time_zone = req.session.user.station.time_zone
    let date = require('../../tools/date.js')(station_time_zone)
    Order.findOne({_user: req.session.user._id, date: {$lte: date.now()}})
      .populate({
        path: "_meal", select: {name: 1, _restaurant: 1},
        populate: {path: '_restaurant', select: {name: 1}}
      })
      .sort({date: -1})
      .exec((err, order) => {
        if (err) res.send({error: errors.generic})
        else res.send(order)
      })
  }

  /*
  * Rate an order
  * @param req.body.rating {Number} rating from 1 to 5
  * @param req.body.order {String} order id
  */
  pub.rate = function (req, res) {
    let {rating, order} = req.body
    Order.findOneAndUpdate({_id: order}, {rating}, (err,order) => {
      if (err) res.send({error: errors.generic})
      if (!order) res.send({error: errors.order_does_not_exist})
      else res.send({success: true})
    })
  }

  return pub

}
