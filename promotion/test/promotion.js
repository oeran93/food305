const db        = require('../../database/start.js')
const app       = require('../../user/app.js')(db)
const should = require('should')
const promotion = require('../promotion.js')()

describe('promotion', done => {
  
  it('should add a promotion', done => {
    promotion.add_referrer({body:{referrer_id: "59c094fb7569f01c02ab42c3", referred_email: 'nico@referral.com'}}, {}, done)
  })

  it('should check for promotions', done => {
    promotion.add_referred({body:{email: 'nico@referral.com'}},{},done)
  })

})