const User = require('../../database/user.js')
const crypto = require('../../tools/crypto.js')()
const twilio = require('../../tools/twilio.js')()
const generics = require('../../tools/generics.js')
const errors = require('../../tools/errors.js')
const _ = require('underscore')

module.exports = {

  session: (req, res, next) => {
    if (req.session && req.session.user) {
      User.findOne({phone: req.session.user.phone}, 'phone name email', (err, user) => {
        if (user) {
          req.session.user = user
        }
        next()
      })
    } else next()
  },

  create_user: (req, res) => {
    let phone = req.body.phone
    let code = generics.rand_number(4)
    User.findOne({phone}, (err, user) => {
      if (err) res.send({error: errors.generic})
      else if (user && user.activated) res.send({error: errors.user_exists})
      else if (user && !user.activated) res.send({error: errors.user_not_active})
      else {
        let user = new User({phone, code, created_at: new Date()})
        user.save(err => {
          if (err) res.send({error: errors.generic})
          else {
            twilio.send_sms(phone, `Your Vimi account code is ${code}`)
            .then(() => res.send({success: true}))
            .catch(err => res.send({error: errors.generic}))
          }
        })
      }
    })
  },

  check_phone_code: (req, res) => {
    let {code, phone} = req.body
    User.findOne({phone, code}, (err, user) => {
      if (err) res.send({error: errors.generic})
      else if (!user) res.send({error: errors.wrong_code})
      else {
        user.activated = 'yes'
        user.save(err => {
          if (err) res.send({error: errors.generic})
          else res.send({success: true})
        })
      }
    })
  },

  create_password: (req, res) => {
    let {pwd, phone, old_pwd} = req.body
    old_pwd = old_pwd || ''
    if (pwd.length < 8) res.send({error: errors.short_pwd})
    else {
      User.findOne({phone}, (err,user) => {
        if (err) res.send({error: errors.generic})
        else if (!user) res.send({error: errors.user_does_not_exist})
        else if (!user.activated) res.send({error: errors.user_not_active})
        else if (user.pwd && crypto.sha512(old_pwd, user.salt) != user.pwd) {
          res.send({error: errors.wrong_old_pwd})
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

  logout: (req, res) => {
    req.session.reset()
    res.redirect('/')
  },

  login: (req, res) => {
    let {phone, pwd} = req.body
    User.findOne({phone}, (err, user) => {
      if (err) res.send({error: errors.generic})
      else if (!user) res.send({error: errors.user_does_not_exist})
      else if (!user.activated) res.send({error: errors.user_not_active})
      else if (crypto.sha512(pwd, user.salt) == user.pwd) {
        req.session.user = _.omit(user, ['password','salt'])
        res.send({success: true})
      } else res.send({error: errors.wrong_old_pwd})
    })
  }

}