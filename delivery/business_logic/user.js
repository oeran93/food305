const User  = require('../../database/user.js')
const error = require('../../tools/form.js')().error

module.exports = function () {

  let pub = {}

  pub.profile = function (req, res) {
    if (req.session && req.session.user) {
      res.send({user: req.session.user})
    } else res.send({user: false})
  }

  return pub
  

}
