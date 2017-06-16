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
    let {station, delivery_day} = req.query
    Station
      .findOne({_id: station})
      .exec((err, station) => {
          Restaurant
            .findOne({_id: station.schedule[delivery_day-1]})
            .populate({
              path: 'meals'
            })
            .exec((err, restaurant) => {
              res.send({
                restaurant: restaurant.name,
                meals: restaurant.meals
              })
            })
      })
  }

  return pub


}
