const globals = require('./globals.js')

module.exports = {

  /*
  * Generates a random number
  * @param length {Number} num digits
  * @return {Number} random number
  */
  rand_number: function (length) {
    let min = Math.pow(10, length-1)
    let max = Math.pow(10, length)-1
    return Math.floor(Math.random() * (max-min)) + min
  },

  /*
  * Calculates price + taxes
  * @param price {number}
  */
  get_taxes_fees: function (price) {
    return (globals.sale_tax*price+globals.credit_card_fixed_rate+price*globals.credit_card_percentage).toFixed(2)
  },

  /*
  * Returns a dollar unit price in cents
  * @param price {number}
  */
  get_price_in_cents: function (price) {
    return (price*100).toFixed(0)
  }

}
