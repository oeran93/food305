const db        = require('../../database/test/start.js')
const app       = require('../../delivery/app.js')(db)
const supertest = require('supertest')
const should = require('should')

describe('payment module', () => {

  it('charges credit card', done => {
    supertest(app)
      .post('/charge_credit_card')
      .send({})
      .end((err, res) => {
        
      })
  })

})
