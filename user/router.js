const User = require('../database/user.js')
const meal  = require('./business_logic/meal.js')()
const order = require('./business_logic/order.js')()
const user  = require('./business_logic/user.js')()
const station = require('./business_logic/station.js')()
const stripe = require('../payment/stripe.js')()
const promotion = require('../promotion/promotion.js')()
const validator = require('../tools/validator.js')()

module.exports = function (app) {
  app.get('/profile', require_login, user.profile)
  app.post('/send_feedback', require_login, user.send_feedback)
  app.get('/get_menu', require_login, meal.get_menu)
  app.get('/get_about_menu', meal.get_about_menu)
  app.post('/add_card', require_login, stripe.add_card, (req,res) => res.send({}))
  app.post('/edit_user', require_login, user.edit_user)
  app.post('/buy_meal', require_login, promotion.get_meal_promotion, stripe.charge_customer, promotion.mark_meal_promotion_as_used, order.add)
  app.get('/get_station', require_login, station.info)
  app.get('/get_stations', station.get_stations)
  app.post('/rate_order', require_login, validator.validate_router('rating'), order.rate)
  app.get('/get_latest_user_order', order.get_latest_user_order)
  app.get('/get_user_orders', order.get_user_orders)
  app.post('/subscribe', stripe.subscribe, (req,res) => res.send({}))
  app.post('/unsubscribe', stripe.unsubscribe, (req,res) => res.send({}))
  app.post('/delete_card', require_login, stripe.delete_card, (req,res) => res.send())
  app.post('/add_referrer', require_login, promotion.add_referrer, (req,res) => res.send())
  app.get('/get_meal_promotion', require_login, promotion.get_meal_promotion, (req, res) => res.send(res.locals.promotion))
}

function require_login (req, res, next) {
  if (!req.session || !req.session.user) res.redirect('/')
  else next()
}
