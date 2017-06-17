const User  = require('../../database/user.js')
const errors = require('../../tools/errors.js')
const twilio = require('../../tools/twilio.js')()

module.exports = function () {

  let pub = {}

  /*
  * Returns user profile if user is logged in.
  */
  pub.profile = function (req, res) {
    if (req.session && req.session.user) {
      res.send({user: req.session.user})
    } else res.send({user: false})
  }

  return pub

}
