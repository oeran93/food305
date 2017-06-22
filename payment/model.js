const errors = require('../tools/errors.js')

module.exports = function (apikey, apisecret) {

  let pub = {}

  pub.charge_credit_card = function (req, res) {
    console.log(req.body)
  }

  return pub

}
