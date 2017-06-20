

module.exports = function (apikey, apisecret, merchant_token) {

  let pub = {}
  let payeezy = require('payeezy')(apikey, apisecret, merchant_token);
  payeezy.version = "v1";
  payeezy.host = "api-cert.payeezy.com"; // Sandbox Environment - Replace this value for Live Environment "api.payeezy.com"
  console.log(payeezy)
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
    payeezy.transaction.authorize(
      {
          method: 'credit_card',
          amount,
          currency_code: 'USD',
          credit_card,
          billing_address
      },
        (err, res) => {
          if (err) console.log('Authorize Transaction Failed\n' + error)
          else if (res) console.log('Authorize Successful.\nTransaction Tag: ' + response.transaction_tag)
        }
    )
  }

  return pub

}
