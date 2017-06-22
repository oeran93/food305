const Station  = require('../../database/station.js')
const errors = require('../../tools/errors.js')

module.exports = function () {

  let pub = {}

  /*
  * Returns station info
  */
  pub.info = function (req, res) {
    if (req.session && req.session.user) {
      Station.findOne({_id: req.session.user.station}, (err, station) => {
        res.send(station)
      })
    } else res.send({error: errors.not_logged_in})
  }

  return pub

}
