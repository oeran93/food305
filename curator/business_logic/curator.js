const User = require('../../database/user.js')
const errors = require('../../tools/errors.js')

module.exports = function () {

  let pub = {}
  
  /*
  * Returns curator profile if user is logged in.
  */
  pub.profile = function (req, res) {
    if (req.session && req.session.user) {
      res.send({curator: req.session.user})
    } else res.send({error: errors.not_logged_in})
  }
  
  return pub
}
