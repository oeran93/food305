let Meal  = require('../business_logic/meal.js')()
let Order = require('../business_logic/order.js')()
let User  = require('../business_logic/user.js')()

module.exports = function (app) {
  app.get('/get_user_basics', User.get_basics)
  app.get('/get_all_meals', Meal.get_all_meals)
  app.get('/get_my_meals', is_logged_in, Meal.get_my_meals)
  app.post('/post_order', is_logged_in, Order.add_order)
  app.post('/update_user', is_logged_in, User.update_user)
}

function is_logged_in (req, res, next) {
  if (req.isAuthenticated()) return next()
  res.sendStatus('401')
}
