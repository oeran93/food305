const should = require('should')
const mailchimp = require('../mailchimp.js')()

describe('mailchimp', done => {

  it('should add a member to the daily menu list', done => {
    mailchimp.add_user_to_daily_menu('lol@lolol.com')
    .then(res => {
      done()
    })
  })

})