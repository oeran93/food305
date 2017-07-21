const Stations_today = require('./business_logic/stations_today.js')()

module.exports = function (app) {
  app.get('/stations_today', Stations_today.get_stations_today)
}
