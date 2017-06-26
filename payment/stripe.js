const errors = require('../tools/errors.js')
const User = require('../database/user.js')
const generics = require('../tools/generics.js')
const globals = require('../tools/globals.js')
const stripe = require("stripe")(globals.stripe_apikey)
const _ = require('underscore')

module.exports = function () {

  let pub = {}

  /*
  * Create a customer on the stripe db
  * the returned user id is saved in the local user table for later use
  * @param req.body.credit_card {Object} credit card info
      object {string} card
      exp_month {string}
      exp_year {string}
      number {string} card number
      cvc {string} card security number
      name {string} credit card holder name
  */
  pub.create_customer = function (req, res, next) {
    let last_4_digits = req.body.credit_card.number.slice(-4)
    stripe.customers.create({
      source: _.extend({
        object: "card",
        exp_month: "",
        exp_year:"",
        number: "",
        cvc: "",
        name: ""
      }, req.body.credit_card)
    }, (err, customer) => {
      if (err) res.send({error: errors.failed_purchase})
      else {
        User.findOneAndUpdate(
            {phone: req.session.user.phone},
            {last_4_digits, stripe_id: customer.id},
            {new: true},
            (err, user) => {
              if (err) res.send({error: errors.failed_purchase})
              else {
                req.session.user.last_4_digits = last_4_digits
                next()
              }
            }
          )
      }
    })
  }

  /*
  * Charges a customer
  * @param req.body.amount
  */
  pub.charge_customer = function (req, res, next) {
    User.findOne({phone: req.session.user.phone}, (err, user) => {
      if (err) res.send({error: errors.failed_purchase})
      else {
        stripe.charges.create({
          amount: generics.get_price_in_cents(req.body.total),
          currency: "usd",
          customer: user.stripe_id
        }, (err, charge) => {
          if (err) res.send({error: _.extend(errors.failed_purchase,{message: err.message})})
          else next()
        })
      }
    })
  }

  return pub

}
