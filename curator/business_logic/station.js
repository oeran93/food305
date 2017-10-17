const Station = require('../../database/station.js')
const Meal = require('../../database/meal.js')
const Restaurant = require('../../database/restaurant.js')
const errors = require('../../tools/errors.js')

module.exports = function () {

  let pub = {}
  
  pub.get_station = function (req, res) {
    Station.findOne({_id: req.session.user.station})
      .populate({
        path: "schedule",
        populate: {path: "meals"}
      })
      .exec((err, station) => {
        if (err) res.send({error: errors.generic})
        else res.send(station)
      })
  }
  
  pub.change_schedule = function (req, res) {
    Station.update(
      { _id: req.session.user.station }
      ,{ $set: { schedule: req.body.schedule }}
      ,(err) => {
        if (err) throw error
        else res.send("success")
      }
    )
  }

  return pub
}
