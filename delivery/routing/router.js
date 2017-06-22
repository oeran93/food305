const Meal  = require('../business_logic/meal.js')()
const Order = require('../business_logic/order.js')()
const User  = require('../business_logic/user.js')()
const Station = require('../business_logic/station.js')()

module.exports = function (app) {
  app.get('/profile', User.profile)
  app.get('/get_menu', Meal.get_menu)
  app.get('/get_future_meals', require_login, Order.get_future_orders)
  app.post('/post_order', require_login, Order.add_order)
  app.get('/get_station', Station.info)
}

function require_login (req, res, next) {
  if (!req.session || !req.session.user) res.redirect('/')
  else next()
}
