const env = process.env

module.exports = {

  sale_tax: .1,

  app_name: "Vimi",

  twilio_accountsid: env.VIMI_TWILIO_ACCOUNTSID,

  twilio_authtoken: env.VIMI_TWILIO_AUTHTOKEN,

  twilio_phone: '+19412571316'

}
