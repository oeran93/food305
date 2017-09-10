const Stations_today = require('./business_logic/stations_today.js')()
const Add_meal = require('./business_logic/add_meal.js')()
const Get_restaurants = require('./business_logic/get_restaurants.js')()
const Change_schedule = require('./business_logic/change_schedule.js')()

module.exports = function (app) {
  app.get('/stations_today', Stations_today.get_stations_today)
  app.get('/get_restaurants', Get_restaurants.get_restaurants)
  app.post('/add_meal', Add_meal.add_meal)
  app.post('/change_schedule', Change_schedule.change_schedule)
}
