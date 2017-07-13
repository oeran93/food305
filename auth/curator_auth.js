const auth = require('./auth.js')()
const errors = require('../tools/errors.js')
const User = require('../database/user.js')

module.exports = function () {

  let pub = {}

  pub.sign_in = function (req, res, next) {
    User.findOne({phone: req.body.phone, tags: "curator"}, (err, user) => {
      if (err) res.send({error: errors.generic})
      else if (!user) res.send({error: errors.wrong_permissions})
      else next()
    })
  }

  return pub

}
