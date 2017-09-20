const Stations_today = require('./business_logic/stations_today.js')()
const Stations_schedule = require('./business_logic/stations_schedule.js')()
const meal = require('./business_logic/meal.js')()
const Add_restaurant = require('./business_logic/add_restaurant.js')()
const Get_restaurants = require('./business_logic/get_restaurants.js')()
const Change_schedule = require('./business_logic/change_schedule.js')()
const Manage_restaurants = require('./business_logic/manage_restaurants.js')()

module.exports = function (app) {
  app.get('/stations_today', Stations_today.get_stations_today)
  app.get('/stations_schedule', Stations_schedule.get_stations_schedule)
  app.get('/get_restaurants', Get_restaurants.get_restaurants)
  app.post('/add_meal', meal.add_meal)
  app.post('/edit_meal', meal.edit_meal)
  app.post('/add_restaurant', Add_restaurant.add_restaurant)
  app.post('/change_schedule', Change_schedule.change_schedule)
  app.post('/manage_restaurants', Manage_restaurants.manage_restaurants)
}
