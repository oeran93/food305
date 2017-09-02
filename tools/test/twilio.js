const should = require('should')
const twilio   = require('../twilio.js')()

describe('twilio tool', function () {

  it('should send an sms - commented out until really needed', done => {
    twilio.send_sms('3143090319', 'hey nicola, how is it going')
    .then(sms => {
      done()
    }).catch(err => {
      throw err
    })
  })

})