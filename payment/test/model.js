const db        = require('../../database/test/start.js')
const app       = require('../../delivery/app.js')(db)
const supertest = require('supertest')
const should = require('should')

describe('payment module', () => {

  it('charges credit card', done => {
    supertest(app)
      .post('/charge_credit_card')
      .send({
        credit_card: {
            card_number: '4788250000028291',
            cvv: '123',
            type: 'visa',
            exp_date: '1230',
            cardholder_name: 'Tom Eck'
        },
        billing_address: {
            street: '225 Liberty Street',
            city: 'NYC',
            state_province: 'NY',
            zip_postal_code: '10281',
            country: 'US'
        },
        amount: "1075"
      })
      .end((err, res) => {
        if (err) return
        res.body.should.have.property('success')
        done()
      })
  })

})
