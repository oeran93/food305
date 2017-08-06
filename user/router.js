const User = require('../database/user.js')
const meal  = require('./business_logic/meal.js')()
const order = require('./business_logic/order.js')()
const user  = require('./business_logic/user.js')()
const station = require('./business_logic/station.js')()
const stripe = require('../payment/stripe.js')()
const validator = require('../tools/validator.js')()

module.exports = function (app) {
  app.get('/profile', user.profile)
  app.get('/get_menu', require_login, stripe.financially_ok, meal.get_menu)
  app.post('/create_customer_and_buy_meal', require_login, stripe.financially_ok, stripe.create_customer, stripe.charge_customer, order.add)
  app.post('/buy_meal', require_login, stripe.financially_ok, stripe.charge_customer, order.add)
  app.get('/get_station', require_login, station.info)
  app.get('/get_stations', station.get_stations)
  app.post('/rate_order', require_login, validator.validate_router('rating'), order.rate)
  app.get('/get_latest_user_order', order.get_latest_user_order)
  app.post('/subscribe', stripe.subscribe, (req,res) => res.send({}))
  app.post('/unsubscribe', stripe.unsubscribe, (req,res) => res.send({}))
}

function require_login (req, res, next) {
  if (!req.session || !req.session.user) res.redirect('/')
  else next()
}
