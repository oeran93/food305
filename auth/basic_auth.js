const User = require('../database/user.js')
const Station = require('../database/station.js')
const crypto = require('../tools/crypto.js')()
const send = require('../notification_center/send.js')
const twilio = require('../tools/twilio.js')()
const generics = require('../tools/generics.js')
const errors = require('../tools/errors.js')
const mailchimp = require('../tools/mailchimp.js')()
const _ = require('underscore')

module.exports = function () {

  let pub = {}
  
  /*
  * Sets the session for the user
  * @param phone {String} User's phone number
  * @param req {object} express request object
  */
  function set_user_session (id, req, next) {
    User
      .findOne({_id: id})
      .populate({path: "station"})
      .select('_id phone email name station last_4_digits stripe.subscription_id')
      .exec((err, user) => {
        if (err || !user) return res.send({error: errors.generic})
        req.session.user = {
          _id: user._id,
          phone: user.phone,
          email: user.email,
          name: user.name,
          station: user.station,
          last_4_digits: user.last_4_digits,
          subscribed: user.stripe.subscription_id ? true : false
        }
        next()
      })
  }

  /*
  * If there is an active session in the request it refreshes it
  */
  pub.session = function (req, res, next) {
    if (req.session && req.session.user) {
      set_user_session(req.session.user._id, req, next)
    } else next()
  }

  /*
  * Creates a new not activated user in the db
  * It will not create a user if it is already present and active or
  * if the phone number is not right.
  * @param req.body {object} user basic infos: phone, name, email
  */
  pub.create_user = function (req, res, next) {
    let phone = req.body.phone.replace(/[^0-9]/g,'')
    let email = req.body.email
    let infos = _.pick(req.body, 'name', 'email', 'station')
    let code = generics.rand_number(6)
    twilio.lookup(phone)
      .catch(() => res.send({error: errors.invalid_phone}))
      .then(() => {
        User.findOne({$or: [{phone}, {email}]}, (err, user) => {
          if (err) return res.send({error: errors.generic})
          else if (user && user.activated) return res.send({error: errors.user_exists})
          User.remove({_id: user ? user._id : null}, (err) => {
            if (err) return res.send({error: errors.generic})
            const new_user = new User(_.extend({},infos,{phone, email, code}))
            new_user.save((err,user) => {
              if (err) return res.send({error: errors.generic})
              send(user).message('sign_up_verification',{code}).text_and_email()
              mailchimp.add_user_to_daily_menu(email)
              next()
            })
          })
        })
    })
  }

  /*
  * Checks if entered code matches the one sent to user
  * @param req.body.code {String} user code
  * @param req.body.phone {String} user phone
  */
  pub.check_phone_code = function (req, res, next) {
    req.body.phone = req.body.phone.replace(/[^0-9]/g,'')
    let {code, phone} = req.body
    User.findOne({phone, code}, (err, user) => {
      if (err) res.send({error: errors.generic})
      else if (!user) res.send({error: errors.invalid_code})
      else next()
    })
  }

 /*
 * Creates a new password for the user
 * @param req.body.pwd {String} new password
 * @param req.body.phone {String} user phone
 * @param req.body.old_pwd {String} this can be missing if current pwd is empty
 */
  pub.create_password = function (req, res, next) {
    req.body.phone = req.body.phone.replace(/[^0-9]/g,'')
    let {pwd, phone, old_pwd} = _.extend({old_pwd: ''},req.body)
    User.findOne({phone}, (err,user) => {
      if (err) res.send({error: errors.generic})
      else if (!user) res.send({error: errors.user_does_not_exist})
      else if (user.pwd && crypto.sha512(old_pwd, user.salt) != user.pwd) {
        res.send({error: errors.invalid_old_pwd})
      }
      else {
        let {hash_pwd, salt} = crypto.hash_password(pwd)
        set_user_session(user._id, req, () => {
          user = _.extend(user, {pwd: hash_pwd, salt, activated: "yes"})
          user.save(err => {
            if (err) res.send({error: errors.generic})
            else next()
          })
        })
      }
    })
  }

  /*
  * Creates a new recovery code, sends it to the user and saves it in the DB
  * @param req.query.phone {String} user phone number
  */
  pub.forgot_pwd = function (req, res, next) {
    let phone = req.query.phone.replace(/[^0-9]/g,'')
    let code = generics.rand_number(10)
    User.findOneAndUpdate({phone}, {code}, {new: true, upsert: false}, (err, user) => {
      if (!user) res.send({error: errors.invalid_phone})
      else if (!user.code) res.send({error: errors.generic})
      else {
        send(user).message('recovery_code',{code}).text_and_email()
        next()
      }
    })
  }

  /*
  * Checks if the code is right and creates a new password for the user
  * @param req.body.code {String} recovery code
  * @param req.body.pwd {String} new password
  * @param req.body.phone {String} phone number
  */
  pub.recover_pwd = function (req, res, next) {
    req.body.phone = req.body.phone.replace(/[^0-9]/g,'')
    let {code, pwd, phone} = req.body
    User.findOne({code, phone},(err, user) => {
      if (err) return res.send({error: errors.generic})
      if (!user) return res.send({error: errors.invalid_code})
      User.update({phone, code},{code: '', pwd: ''}, (err, user) => {
        if (err) res.send({error: errors.generic})
        else pub.create_password(req, res, next)
      })
    })
  }
  
  /*
  * Changes user's password
  * @param req.body.old_pwd {String} old password
  * @param req.body.pwd {String} new password
  */
  pub.change_pwd = function (req, res, next) {
    req.body.phone = req.session.user.phone
    let {old_pwd, pwd} = req.body
    pub.create_password(req, res, next)
  }

  /*
  * Logs out user
  */
  pub.sign_out = function (req, res) {
    req.session.reset()
    res.redirect('/')
  }

  /*
  * Logs in user
  * @param req.body.phone {String} user phone
  * @param req.body.pwd {String} user pwd
  */
  pub.sign_in = function (req, res, next) {
    let {phone, pwd} = req.body
    phone = phone.replace(/[^0-9]/g,'')
    User.findOne({phone}, (err, user) => {
      if (err) res.send({error: errors.generic})
      else if (!user || !user.activated) res.send({error: errors.user_does_not_exist})
      else if (crypto.sha512(pwd, user.salt) == user.pwd) {
        set_user_session(user._id, req, next)
      }
      else res.send({error: errors.invalid_old_pwd})
    })
  }

  return pub

}
