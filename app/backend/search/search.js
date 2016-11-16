var Restaurant = require('../database/restaurant.js')
var Meal = require('../database/meal.js')
var Order = require('../database/order.js')
var _ = require('underscore')
var date = require('../../tools/date.js')

var Search = function () {

  var public = {}

  public.getInitialData = function (req, res) {
    if (req.user) {
      var user = req.user.facebook
      res.send({name: user.name, picture: user.picture})
    } else {
      res.send({})
    }
  }

  public.getAllMeals = function (req, res) {
    var thisOrder = date.thisOrder().format('MMM DD YYYY, hh')
    Restaurant
      .find()
      .populate({
        path: 'meals',
        populate: {
          path: 'orders',
          match: {date: {'$eq':thisOrder}}
        }
      })
      .exec((err, restaurants) => {
        res.send(restaurants)
      })
  }

  public.getMyMeals = function (req, res) {
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
        res.send(_.map(orders, (order) => {
          return order._meal
        }))
      })
  }

  public.addOrder = function (req,res) {
    var order = new Order({
      _meal: req.body.meal,
      _user: req.user.id,
      date: req.body.date
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

  return public
  

}

module.exports = Search
