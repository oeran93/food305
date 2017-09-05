const Stations_today = require('./business_logic/stations_today.js')()
const Add_meal = require('./business_logic/add_meal.js')()

module.exports = function (app) {
  app.get('/stations_today', Stations_today.get_stations_today)
  app.post('/add_meal', Add_meal.add_meal)
}
