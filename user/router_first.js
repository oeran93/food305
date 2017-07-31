const stripe = require('../payment/stripe.js')()
const auth = require('../auth/basic_auth.js')()
/*
* This router should contain each route that the app should take before any other
* action is taken
*/

module.exports = function (app) {
  app.use(stripe.update_financial_status)
  app.use(auth.session)
}
