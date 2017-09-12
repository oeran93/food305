const errors = require('../tools/errors.js')
const User = require('../database/user.js')
const Meal = require('../database/meal.js')
const generics = require('../tools/generics.js')
const globals = require('../tools/globals.js')
const auth = require('../auth/basic_auth.js')()
const stripe = require("stripe")(globals.stripe_apikey)
const date = require("../tools/date.js")()
const _ = require('underscore')

module.exports = function () {

  let pub = {}
  
  /*
  * Add a credit card to this user's account.
  * If the user is not yet on stripe it will create a new customer.
  * @param req.body.credit_card {Object} credit card info
      object {string} card
      exp_month {string}
      exp_year {string}
      number {string} card number
      cvc {string} card security number
      name {string} credit card holder name
  */
  pub.add_card = function (req, res, next) {
    let credit_card = req.body.credit_card
    User.findOne({phone: req.session.user.phone}, (err, user) => {
      if (!user.stripe.id) return create_customer(req, res, next)
      stripe.customers.createSource(
        user.stripe.id,
        {source: _.extend(credit_card,{object:"card"})},
        (err, card) => {
          user.last_4_digits = credit_card.number.slice(-4)
          user.save((err) => {
            if (err) return res.send({error: errors.generic})
            next()
          })
        }
      )
    })
  }
  
  /*
  * Create a customer on the stripe db.
  * The returned user id is saved in the local user table for later use
  * @param req.body.credit_card {Object} credit card info
      object {string} card
      exp_month {string}
      exp_year {string}
      number {string} card number
      cvc {string} card security number
      name {string} credit card holder name
  */
  function create_customer (req, res, next) {
    let credit_card = req.body.credit_card
    User.findOne({phone: req.session.user.phone}, (err, user) => {
      stripe.customers.create(
        {source: _.extend(credit_card,{object:"card"})},
        (err, customer) => {
          if (err) return res.send({error: errors.generic})
          user.last_4_digits = credit_card.number.slice(-4)
          user.stripe.id = customer.id
          user.markModified('stripe')
          user.save((err) => {
            if (err) return res.send({error: errors.generic})
            next()
          })
        }
      )
    })
  }
  
  /*
  * Deletes customer credit card from stripe and last 4 digits from our db
  */
  pub.delete_card = function (req,res,next) {
    User.findOne({phone: req.session.user.phone}, (err, user) => {
        if (err) return res.send({error: errors.generic})
        stripe.customers.listCards(user.stripe.id, (err, cards) => {
          if (err) return res.send({error: errors.cant_delete_card})
          stripe.customers.deleteCard(user.stripe.id,cards.data[0].id, (err, confirmation) => {
            if (err) res.send({error: errors.cant_delete_card})
            else if(!confirmation.deleted) res.send({error: errors.cant_delete_card})
            else {
              user.last_4_digits = ""
              user.save((err) => {
                if (err) return res.send({error: errors.generic})
                next()
              })
            }
          })
        })
        
    })
  }

  /*
  * Charges a customer
  * @param req.body.meal {String} meal's id
  * @param req.body.credit_card {object} optional if the user has saved their credit card
  */
  pub.charge_customer = function (req, res, next) {
    User.findOne({phone: req.session.user.phone}, (err, user) => {
      if (err) res.send({error: errors.generic})
      else {
        Meal.findOne({_id: req.body.meal}, (err, meal) => {
            if (err) return res.send({error: errors.failed_purchase})
            let amount = (Number(generics.get_taxes_fees(meal.price)) + Number(meal.price)).toFixed(2)
            stripe.charges.create(
              _.extend({
                  amount: generics.get_price_in_cents(amount),
                  currency: "usd"
                }, 
                user.stripe.id ? {customer:  user.stripe.id} : {source: req.body.credit_card}
              ), 
            (err, charge) => {
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
  * Unsubscribe a user from our basic plan
  */
  pub.unsubscribe = function (req, res, next) {
    User.findOne({phone: req.session.user.phone}, (err, user) => {
      if (err) res.send({error: errors.generic})
      stripe.subscriptions.del(
        user.stripe.subscription_id,
        {at_period_end: true},
        (err, confirmation) => {
          if (err) return res.send({error: errors.failed_unsubscribe})
          user.stripe.subscription_id = ""
          user.markModified('stripe')
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
