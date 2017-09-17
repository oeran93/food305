const Station  = require('../../database/station.js')
const errors = require('../../tools/errors.js')

module.exports = function () {

  let pub = {}

  /*
  * Returns station info
  */
  pub.info = function (req, res) {
    Station.findOne({_id: req.session.user.station, hidden: false}, (err, station) => {
      res.send(station)
    })
  }

  /*
  * Returns all available stations
  */
  pub.get_stations = function (req, res) {
    Station.find({hidden: false}, (err, stations) => {
      res.send(stations)
    })
  }

  return pub

}
