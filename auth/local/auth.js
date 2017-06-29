const User = require('../../database/user.js')
const Station = require('../../database/station.js')
const crypto = require('../../tools/crypto.js')()
const twilio = require('../../tools/twilio.js')()
const generics = require('../../tools/generics.js')
const errors = require('../../tools/errors.js')
const _ = require('underscore')

module.exports = function () {

  let pub = {}

  /*
  * If there is an active session in the request it sends some user infos
  * to the client
  */
  pub.session = function (req, res, next) {
    if (req.session && req.session.user) {
      User
        .findOne({phone: req.session.user.phone})
        .select('_id phone station last_4_digits')
        .exec((err, user) => {
          if (user) req.session.user = user
          next()
        })
    } else next()
  }

  /*
  * Creates a new not activated user in the db
  * It will not create a user if it is already present and active or
  * if the number is not right.
  * @param req.body {object} user basic infos: phone, name, email
  */
  pub.create_user = function (req, res) {
    let phone = req.body.phone.replace(/[^0-9]/g,'')
    let infos = _.pick(req.body, 'name', 'email')
    let code = generics.rand_number(6)
    User.findOne({phone}, (err, user) => {
      if (err) res.send({error: errors.generic})
      else if (user && user.activated) res.send({error: errors.user_exists})
      else {
        Station.findOne({}, (err, station) => {
          User.update(
            {phone},
            _.extend({
              code: code,
              created_at: new Date (),
              station: station._id
            },infos),
            {upsert: true},
            err => {
              if (err) res.send({error: errors.generic})
              else {
                twilio.send_sms(phone, `Your Vimi account code is ${code}`)
                  .then(() => res.send({success: true}))
                  .catch(() => {
                    User.remove({phone})
                    res.send({error: errors.invalid_phone})
                  })
              }
            }
          )
        })
      }
    })
  }

  /*
  * Checks if entered code matches the one sent to user
  * @param req.body.code {String} user code
  * @param req.body.phone {String} user phone
  */
  pub.check_phone_code = function (req, res) {
    let {code, phone} = req.body
    User.findOne({phone, code}, (err, user) => {
      if (err) res.send({error: errors.generic})
      else if (!user) res.send({error: errors.invalid_code})
      else res.send({success: true})
    })
  }

 /*
 * Creates a new password for the user
 * @param req.body.pwd {String} new password
 * @param req.body.phone {String} user phone
 * @param req.body.old_pwd {String} this can be missing if current pwd is empty
 */
  pub.create_password = function (req, res) {
    let {pwd, phone, old_pwd} = _.extend({old_pwd: ''},req.body)
    User.findOne({phone}, (err,user) => {
      if (err) res.send({error: errors.generic})
      else if (!user) res.send({error: errors.user_does_not_exist})
      else if (user.pwd && crypto.sha512(old_pwd, user.salt) != user.pwd) {
        res.send({error: errors.invalid_old_pwd})
      }
      else {
        let {hash_pwd, salt} = crypto.hash_password(pwd)
        req.session.user = user
        user = _.extend(user, {pwd: hash_pwd, salt, activated: "yes"})
        user.save(err => {
          if (err) res.send({error: errors.generic})
          else res.send({success: true})
        })
      }
    })
  }

  /*
  * Creates a new recovery code, sends it to the user and saves it in the DB
  * @param req.query.phone {String} user phone number
  */
  pub.forgot_pwd = function (req, res) {
    let phone = req.query.phone.replace(/[^0-9]/g,'')
    let code = generics.rand_number(10)
    User.findOneAndUpdate({phone}, {code}, {new: true}, (err, user) => {
      if (!user) res.send({error: errors.invalid_phone})
      else if (!user.code) res.send({error: errors.generic})
      else {
        twilio.send_sms(
          phone,
          `Your Vimi Password Recovery Code is ${code}`
        )
        res.send({success: true})
      }
    })
  }

  /*
  * Checks if the code is right and creates a new password for the user
  * @param req.body.code {String} recovery code
  * @param req.body.pwd {String} new password
  * @param req.body.phone {String} phone number
  */
  pub.recover_pwd = function (req, res) {
    let phone = req.body.phone.replace(/[^0-9]/g,'')
    let {code, pwd} = req.body
    User.find({code, phone},(err, user) => {
      if (err) res.send({error: errors.generic})
      if (!user) res.send({error: errors.invalid_code})
      else {
        User.update({phone, code},{code: '', pwd: ''}, (err, user) => {
          if (err) res.send({error: errors.generic})
          else pub.create_password(req, res)
        })
      }
    })
  }

  /*
  * Logs out user
  */
  pub.logout = function (req, res) {
    req.session.reset()
    res.redirect('/')
  }

  /*
  * Logs in user
  * @param req.body.phone {String} user phone
  * @param req.body.pwd {String} user pwd
  */
  pub.login = function (req, res) {
    let {phone, pwd} = req.body
    phone = phone.replace(/[^0-9]/g,'')
    User.findOne({phone}, (err, user) => {
      if (err) res.send({error: errors.generic})
      else if (!user) res.send({error: errors.user_does_not_exist})
      else if (!user.activated) res.send({error: errors.user_not_active})
      else if (crypto.sha512(pwd, user.salt) == user.pwd) {
        req.session.user = _.omit(user, ['password','salt'])
        res.send({success: true})
      } else res.send({error: errors.invalid_old_pwd})
    })
  }

  return pub

}
