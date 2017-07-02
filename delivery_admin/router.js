const Orders = require('./business_logic/orders.js')()

module.exports = function (app) {
  app.get('/delivery_orders', Orders.get_delivery_orders)
}
