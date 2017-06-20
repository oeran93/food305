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
  * if there is an active session in the request it sends some user info
  * to the client
  */
  pub.session = function (req, res, next) {
    if (req.session && req.session.user) {
      User
        .findOne({phone: req.session.user.phone})
        .select('phone station')
        .exec((err, user) => {
          if (user) req.session.user = user
          next()
        })
    } else next()
  },

  /*
  * Creates a new not activated user in the db
  * @param req.body.phone {String} user phone number
  * will not create user if already present and active or if number is not right.
  */
  pub.create_user = function (req, res) {
    let phone = req.body.phone
    let code = generics.rand_number(6)
    User.findOne({phone}, (err, user) => {
      if (err) res.send({error: errors.generic})
      else if (user && user.activated) res.send({error: errors.user_exists})
      else {
        Station.findOne({}, (err, station) => {
          User.update(
            {phone},
            { $set: {
                code: code,
                created_at: new Date (),
                station: station._id
              }
            },
            {upsert: true},
            err => {
              if (err) res.send({error: errors.generic})
              else {
                twilio.send_sms(phone, `Your Vimi account code is ${code}`)
                .then(() => res.send({success: true}))
                .catch(err => {
                  User.remove({phone}, err => {
                    if (err) {console.log(err)} // what happens if there is an error deleting the user ?
                    res.send({error: errors.invalid_phone})
                  })
                })
              }
            }
          )
        })
      }
    })
  },

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
      else {
        user.activated = 'yes'
        user.save(err => {
          if (err) res.send({error: errors.generic})
          else res.send({success: true})
        })
      }
    })
  },

 /*
 * Create a new password for the user
 * @param req.body.pwd {String} new password
 * @param req.body.phone {String} user phone
 * @param req.body.old_pwd {String} this can be missing if current pwd is empty
 */
  pub.create_password = function (req, res) {
    let {pwd, phone, old_pwd} = req.body
    old_pwd = old_pwd || ''
    if (pwd.length < 8) res.send({error: errors.short_pwd})
    else {
      User.findOne({phone}, (err,user) => {
        if (err) res.send({error: errors.generic})
        else if (!user) res.send({error: errors.user_does_not_exist})
        else if (!user.activated) res.send({error: errors.user_not_active})
        else if (user.pwd && crypto.sha512(old_pwd, user.salt) != user.pwd) {
          res.send({error: errors.invalid_old_pwd})
        }
        else {
          let {hash_pwd, salt} = crypto.hash_password(pwd)
          req.session.user = user
          user.pwd = hash_pwd
          user.salt = salt
          user.save(err => {
            if (err) res.send({error: errors.generic})
            else res.send({success: true})
          })
        }
      })
    }
  },

  /*
  * creates a new recovery code, sends it to the user and saves it in the DB
  * @param req.query.phone {String} user phone number
  */
  pub.forgot_pwd = function (req, res) {
    let code = generics.rand_number(10)
    User.findOneAndUpdate({phone: req.query.phone}, {code}, {new: true}, (err, user) => {
      if (!user) res.send({error: errors.invalid_phone})
      else if (!user.code) res.send({error: errors.generic})
      else {
        twilio.send_sms(
          req.query.phone,
          `Your Vimi Password Recovery Code is ${code}`
        )
        res.send({success: true})
      }
    })
  },

  /*
  * checks if the code is right and creates a new password for the user
  * @param req.body.code {String} recovery code
  * @param req.body.pwd {String} new password
  * @param req.body.phone {String} phone number
  */
  pub.recover_pwd = function (req, res) {
    let {code, pwd, phone} = req.body
    User.findOneAndUpdate({code, phone}, {code: '', pwd: ''}, (err, user) => {
      if (err) res.send({error: errors.generic})
      if (!user) res.send({error: errors.invalid_code})
      else pub.create_password(req, res)
    })
  },

  /*
  * logout user
  */
  pub.logout = function (req, res) {
    req.session.reset()
    res.redirect('/')
  },

  /*
  * login user
  * @param req.body.phone {String} user phone
  * @param req.body.pwd {String} user pwd
  */
  pub.login = function (req, res) {
    let {phone, pwd} = req.body
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
