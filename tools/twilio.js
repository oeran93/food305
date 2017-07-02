const globals = require('./globals.js')
const twilio = require('twilio')
var sender = twilio(globals.twilio_accountsid, globals.twilio_authtoken)
var lookup = new twilio.LookupsClient(globals.twilio_accountsid, globals.twilio_authtoken)

module.exports = function (priv = {}) {

    let pub = {}

    pub.send_sms = function (phone, message) {
        return new Promise((resolve, reject) => {
            sender.messages.create({
                to: phone,
                from: globals.twilio_phone,
                body: message,
            }, (err, message) => {
                if (err) reject(err.message)
                else resolve(message)
            })
        })
    }

    pub.lookup = function (phone) {
      return new Promise((resolve, reject) => {
        lookup.phoneNumbers(phone).get(err => {
          if (err) reject()
          else resolve()
        })
      })
    }

    return pub
}
