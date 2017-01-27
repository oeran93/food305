const User  = require('../../database/user.js')
const error = require('../../tools/form.js')().error

module.exports = function () {

  let pub = {}

  pub.get_basics = function (req, res) {
    if (req.user) {
      let fb = req.user.facebook
      let user = req.user
      res.send({
        email: user.email, 
        name: fb.name, 
        picture: fb.picture
      })
    } else {
      res.send(false)
    }
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
