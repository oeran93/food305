const errors = require('../tools/errors.js')
const User = require('../database/user.js')
const Meal = require('../database/meal.js')
const generics = require('../tools/generics.js')
const globals = require('../tools/globals.js')
const stripe = require("stripe")(globals.stripe_apikey)
const date = require("../tools/date.js")()
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
      if (err) return res.send({error: errors.failed_purchase})
      User.findOneAndUpdate(
        {phone: req.session.user.phone},
        {$set: {last_4_digits, 'stripe.id': customer.id}},
        {new: true},
        (err, user) => {
          if (err) return res.send({error: errors.failed_purchase})
          req.session.user.last_4_digits = last_4_digits
          next()
        }
      )
    })
  }

  /*
  * Charges a customer
  * @param req.body.meal {String} meal's id
  */
  pub.charge_customer = function (req, res, next) {
    User.findOne({phone: req.session.user.phone}, (err, user) => {
      if (err) res.send({error: errors.generic})
      else {
        Meal.findOne({_id: req.body.meal}, (err, meal) => {
            if (err) return res.send({error: errors.failed_purchase})
            let amount = (Number(generics.get_taxes_fees(meal.price)) + Number(meal.price)).toFixed(2)
            stripe.charges.create({
              amount: generics.get_price_in_cents(amount),
              currency: "usd",
              customer: user.stripe.id
            }, (err, charge) => {
              if (err) return res.send({error: _.extend(errors.failed_purchase,{message: err.message})})
              next()
            })
        })
      }
    })
  }
  
  /*
  * Subscribe a user to our basic plan
  */
  pub.subscribe = function (req, res, next) {
    User.findOne({phone: req.session.user.phone}, (err, user) => {
      if (err) res.send({error: errors.generic})
      stripe.subscriptions.create({
        customer: user.stripe.id,
        plan: "basic-delivery-plan"
      }, (err, subscription) => {
          if (err) return res.send({error: errors.failed_subscribe})
          user.stripe.subscription_id = subscription.id
          user.markModified('stripe')
          user.save((err) => {
            next()
          })
        }
      )
    })
  }
  
  /*
  * Unsubscribe a user to our basic plan
  */
  pub.unsubscribe = function (req, res, next) {
    User.findOne({phone: req.session.user.phone}, (err, user) => {
      if (err) res.send({error: errors.generic})
      stripe.subscriptions.del(
        user.stripe.subscription_id,
        (err, confirmation) => {
          if (err) return res.send({error: errors.failed_unsubscribe})
          user.stripe.subscription_id = ""
          user.save((err) => next())
          next()
        }
      )
    })
  }
  
  /*
  * Checks if a user is either on a free trial or subscribed
  * reroutes the user to the right page if they are not
  */
  pub.financially_ok = function (req,res,next) {
    User
      .findOne({phone: req.session.user.phone}, (err, user) => {
        if (err || !user) return next()
        if (!user.stripe.subscription_id) {
          let trial_period_over = date.older_than(date.iso_date_to_moment(user.created_at), globals.trial_days)
          if (trial_period_over) res.send({redirect: '/subscribe'})
          else next()
        } else {
          stripe.subscriptions.retrieve(
            user.stripe.subscription_id,
            (err, subscription) => {
              if (err) next()
              if (_.contains(globals.ok_financial_statuses, subscription.status)) next()
              else res.send({redirect: '/failed_billing'})
            }
          )
        }
      })
  }
  

  return pub

}
