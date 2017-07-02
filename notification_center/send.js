const info_email = require('../tools/globals.js').info_email
const amazon_ses = require('../tools/amazon_ses.js')
const twilio = require('../tools/twilio.js')()
const _ = require('underscore')

module.exports = function (user) {

    return {

      user,

      from_email: "info@vimifood.com",

      message: function (file, infos) {
        let message = require('./'+file)(_.extend(this.user,infos))
        this.body = message.body
        this.subject = message.subject
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
