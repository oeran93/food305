const aws     = require('aws-sdk')
const ses = new aws.SES()

module.exports = function (from_email, to_email, subject="", body="") {

  let params = {
    Destination: {
      ToAddresses: [to_email]
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: body
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject
      }
    },
    Source: from_email
  }

  return new Promise((resolve, reject) => {
    ses.sendEmail(params, err => {
      if (err) reject()
      else resolve()
    })
  })

}
