const env = process.env

module.exports = {

  sale_tax: .10679,

  credit_card_fixed_rate: .30,

  credit_card_percentage: .03,

  app_name: "Vimi",

  twilio_accountsid: env.VIMI_TWILIO_ACCOUNTSID,

  twilio_authtoken: env.VIMI_TWILIO_AUTHTOKEN,

  twilio_phone: '+19412571316',

  stripe_apikey: env.VIMI_STRIPE_APIKEY,

  order_date_format: "MM-DD-YYYY hh:mm a",

  info_email: "info@vimifood.com"

}
