const env = process.env

module.exports = {

  sale_tax: .10679,

  credit_card_fixed_rate: .30,

  credit_card_percentage: .03,
  
  trial_days: 30,

  app_name: "Vimi",

  twilio_accountsid: env.VIMI_TWILIO_ACCOUNTSID,

  twilio_authtoken: env.VIMI_TWILIO_AUTHTOKEN,

  twilio_phone: '+19412571316',

  stripe_apikey: env.VIMI_STRIPE_APIKEY,

  order_date_format: "MM-DD-YYYY HH:mm",
  
  iso_date_format: "YYYY-MM-DDTHH:mm:ssZ",

  info_email: "info@vimifood.com",

  user_port: env.USER_PORT,

  admin_port: env.ADMIN_PORT,

  test_port: env.TEST_PORT,
  
  ok_financial_statuses: ['active', 'trialing'],
  
  failed_financial_statuses: ['past_due']

}
