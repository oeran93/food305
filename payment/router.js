const model = require('./model.js')()

module.exports = function (app) {

  app.post('/charge_credit_card', model.charge_credit_card)

}
