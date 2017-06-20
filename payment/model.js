const errors = require('../tools/errors.js')

module.exports = function (apikey, apisecret, merchant_token) {

  let pub = {}
  let payeezy = require('payeezy')(apikey, apisecret, merchant_token);
  payeezy.version = "v1";
  payeezy.host = "api-cert.payeezy.com"; // Sandbox Environment - Replace this value for Live Environment "api.payeezy.com"

  /*
  * Charge user's credit card
  * @param req.body.amount {String}
  * @param req.body.credit_card {Object}
        card_number: '4788250000028291',
        cvv: '123',
        type: 'visa',
        exp_date: '1230',
        cardholder_name: 'Tom Eck'
  * @param req.body.billing_address {Object}
        street: '225 Liberty Street',
        city: 'NYC',
        state_province: 'NY',
        zip_postal_code: '10281',
        country: 'US'
  */
  pub.charge_credit_card = function (req, res) {
    let {amount, credit_card, billing_address} = req.body
    payeezy.transaction.purchase(
      {
          method: 'credit_card',
          amount: amount * 100,
          currency_code: 'USD',
          credit_card,
          billing_address
      },
        (err, response) => {
          if (err) {
            console.log('purchase error: ', err.Error.messages) /*LOGIT*/
            res.send({errors: errors.failed_purchase})
          }
          else if (response) res.send({success: true})
        }
    )
  }

  return pub

}
