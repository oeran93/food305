const Meal  = require('../business_logic/meal.js')()
const Order = require('../business_logic/order.js')()
const User  = require('../business_logic/user.js')()
const Station = require('../business_logic/station.js')()
const Auth = require('../../auth/local/auth.js')()
const stripe = require('../../payment/stripe.js')()

module.exports = function (app) {
  app.get('/profile', Auth.session, User.profile)
  app.get('/get_menu', Meal.get_menu)
  app.post('/create_customer_and_buy_meal', stripe.create_customer, stripe.charge_customer, Order.add)
  app.post('/buy_meal', stripe.charge_customer, Order.add)
  app.get('/get_station', require_login, Station.info)
  app.get('/get_stations', Station.get_stations)
}

function require_login (req, res, next) {
  if (!req.session || !req.session.user) res.redirect('/')
  else next()
}
