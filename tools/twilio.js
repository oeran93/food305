const globals = require('./globals.js')
var client = require('twilio')(globals.twilio_accountsid, globals.twilio_authtoken)

module.exports = function (priv = {}) {

    let pub = {}

    pub.send_sms = function (phone, message) {
        return new Promise((resolve, reject) => {
            client.messages.create({
                to: phone,
                from: globals.twilio_phone,
                body: message,
            }, (err, message) => {
                if (err) reject(err.message)
                else resolve(message)
            })
        })
    }

    return pub
}