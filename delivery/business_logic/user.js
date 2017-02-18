const User  = require('../../database/user.js')
const error = require('../../tools/form.js')().error

module.exports = function () {

  let pub = {}

  pub.profile = function (req, res) {
    res.send({user: req.user})
  }

  pub.update_user = function (req, res) {
    if (error.invalid_email(req.body.email)) {
      res.send({error: 'invalid email'})
      return
    }
    User.update(
      {_id: req.user._id},
      {email: req.body.email},
      {},
      () => res.sendStatus(200) 
    )
  }

  return pub
  

}
