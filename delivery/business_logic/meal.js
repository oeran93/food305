const Restaurant = require('../../database/restaurant.js')
const Station    = require('../../database/station.js')

module.exports = function () {

  let pub = {}

  /*
  * Returns station menu for the day. Every day one restaurant and 5 meals.
  * @param req.query.station {id} id of the station
  * @param req.query.delivery_day {moment} date of next closest delivery
  */
  pub.get_menu = function (req, res) {
    let {station, delivery_day, date} = req.query
    Station
      .findOne({_id: station})
      .exec((err, station) => {
          Restaurant
            .findOne({_id: station.schedule[delivery_day-1]})
            .populate({
              path: "meals",
              select: "name price image tags orders description",
              match: {hidden: {$exists: false}},
              populate: {
                path: "orders",
                match: {date: {'$gte': date}, _user: {'$eq': req.session.user._id}}
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
      })
  }

  return pub


}
