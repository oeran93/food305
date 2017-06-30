const aws     = require('aws-sdk');
const twilio = require('../tools/twilio.js')
const email = require('../tools/globals.js').info_email

const ses = new aws.SES()

let params = {
  Destination: {
    ToAddresses: []
  },
  Message: {
    Body: {
      Text: {
        Charset: "UTF-8",
        Data: ""
      }
    },
    Subject: {
      Charset: "UTF-8",
      Data: "Vimi Verification Code"
    }
  },
  Source: email
}

module.exports = function (email, code) {

  params.Message.Body.Text.Data = `${email} Vimi account code is ${code}`
  params.Destination.ToAddresses.push("info@vimifood.com")

  ses.sendEmail(params, (err, data) => {
    console.log(err, data)
  })

}
