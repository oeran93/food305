const Orders = require('./business_logic/orders.js')()
const Meals = require('./business_logic/meals.js')()
const Restaurants = require('./business_logic/restaurants.js')()

module.exports = function (app) {
  app.get('/delivery_orders', Orders.get_delivery_orders)
  app.get('/num_orders_by_meal', Meals.get_num_orders_by_meal)
  app.get('/num_orders_by_restaurant', Restaurants.get_num_orders_by_restaurant)

}
