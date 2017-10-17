const meal = require('./business_logic/meal.js')()
const station = require('./business_logic/station.js')()
const restaurant = require('./business_logic/restaurant.js')()
const curator = require('./business_logic/curator.js')()

module.exports = function (app) {
  app.get('/profile', require_login, curator.profile)
  app.get('/get_restaurants', require_login, restaurant.get_all)
  app.post('/add_restaurant', require_login, restaurant.add)
  app.post('/edit_restaurant', require_login, restaurant.edit)
  app.post('/delete_restaurant', require_login, restaurant.delete)
  app.post('/add_meal', require_login, meal.add)
  app.post('/edit_meal', require_login, meal.edit)
  app.post('/delete_meal', require_login, meal.delete)
  app.post('/change_meal_visibility', require_login, meal.change_visibility)
  app.get('/get_station', require_login, station.get_station)
  app.post('/change_station_schedule', require_login, station.change_schedule)
}

function require_login (req, res, next) {
  if (!req.session || !req.session.user) res.redirect('/')
  else next()
}