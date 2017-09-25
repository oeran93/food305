const Restaurant = require('../../database/restaurant.js')
const Station    = require('../../database/station.js')
const globals = require('../../tools/globals.js')

module.exports = function () {

  let pub = {}

  /*
  * Returns station current menu.
  */
  pub.get_menu = function (req, res) {
    let station = req.session.user.station 
    let date = require('../../tools/date.js')(station.time_zone).this_order_delivery()
    let delivery_date = date.format(globals.order_date_time_format)
    Restaurant
      .findOne({_id: station.schedule[date.day()-1]})
      .populate({
        path: "meals",
        select: "name price image tags orders description",
        match: {hidden: false},
        populate: {
          path: "orders",
          match: {date: {'$gte': delivery_date}, _user: {'$eq': req.session.user._id}}
        }
      })
      .exec((err, restaurant) => {
        if (err) res.sendStatus(400)
        res.send({
          restaurant: {
            name: restaurant.name,
            catch_phrase: restaurant.catch_phrase
          },
          meals: restaurant.meals
        })
      })
  }
  
  /*
  * Menu from a random station for the about page
  */
  pub.get_about_menu = function (req,res,next) {
    Station.findOne({}, (err, station) => {
      let date = require('../../tools/date.js')(station.time_zone).this_order_delivery()
      Restaurant
        .findOne({_id: station.schedule[date.day()-1]})
        .populate({
          path: "meals",
          select: "name price image tags",
          match: {hidden: false}
        })
        .exec((err, restaurant) => {
          if (err) res.sendStatus(400)
          res.send({
            station,
            meals: restaurant.meals
          })
        })
    })
  }

  return pub


}
