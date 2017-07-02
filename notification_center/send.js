const info_email = require('../tools/globals.js').info_email
const amazon_ses = require('../tools/amazon_ses.js')
const twilio = require('../tools/twilio.js')()

module.exports = function (user) {


    return {

      user,

      verification_code: function (code) {
        this.subject = "Welcome to the Vimi community"
        this.body = `Hello ${this.user.name}, \n your Vimi account code is ${code}`
        this.from_email = info_email
        return this
      },

      text_and_email: function () {
        return new Promise ((resolve, reject) => {
          this.text()
          .then(() => {
            this.email()
            .then(resolve)
            .catch(reject)
          }).catch(reject)
        })
      },

      text: function () {
        return new Promise ((resolve, reject) => {
          twilio.send_sms(user.phone, this.body)
          .then(resolve)
          .catch(reject)
        })
      },

      email: function () {
        return new Promise ((resolve, reject) => {
          amazon_ses(this.from_email, user.email, this.subject, this.body)
          .then(resolve)
          .catch(reject)
        })
      },

    }



}
