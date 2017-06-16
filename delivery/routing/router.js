let Meal  = require('../business_logic/meal.js')()
let Order = require('../business_logic/order.js')()
let User  = require('../business_logic/user.js')()

module.exports = function (app) {
  app.get('/profile', User.profile)
  app.get('/get_menu', Meal.get_menu)
  app.get('/get_future_meals', require_login, Order.get_future_orders)
  app.post('/post_order', require_login, Order.add_order)
}

function require_login (req, res, next) {
  if (!req.session || !req.session.user) res.redirect('/')
  else next()
}
