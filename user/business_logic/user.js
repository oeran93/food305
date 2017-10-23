const User  = require('../../database/user.js')
const Promotion = require('../../database/promotion.js')
const errors = require('../../tools/errors.js')
const twilio = require('../../tools/twilio.js')()
const _ = require('underscore')

module.exports = function () {

  let pub = {}

  /*
  * Returns user profile if user is logged in.
  */
  pub.profile = function (req, res) {
    if (req.session && req.session.user) {
      res.send({user: req.session.user})
    } else res.send({error: errors.not_logged_in})
  }
  
  /*
  * The only editable user properties are:
  *   name
  *   station
  */
  pub.edit_user = function (req, res) {
    User.findOne({phone: req.session.user.phone}, (err, user) => {
      if (err) return res.send({error: errors.generic})
      let changes = {
        name: req.body.name,
        station: req.body.station ? req.body.station.value : null
      }
      _.each(changes, (value, key) => {if (value) user[key] = value})
      user.save((err) => {
        if (err) res.send({error: errors.generic})
        else res.send({})
      })
    })
  }

  return pub

}
