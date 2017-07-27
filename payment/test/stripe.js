const db        = require('../../database/start.js')
const app       = require('../../user/app.js')(db)
const supertest = require('supertest')
const should = require('should')
const stripe = require('../stripe.js')()

describe('payment module', () => {

  // it('creates customer correctly', done => {
  //   supertest(app)
  //     .post('/create_customer_and_buy_meal')
  //     .send({credit_card: {
  //         object: "card",
  //         exp_month: "03",
  //         exp_year:"21",
  //         number: "4242424242424242",
  //         cvc: "993",
  //         name: "Nicola Pedretti"
  //       }
  //     })
  //     .end((err, res) => {
  //       if(!err) done()
  //     })
  // })
  
  it('checks if user is financially ok', done => {
    supertest(app)
      .post('/is_financially_ok')
      .send({phone: "3143090319"})
      .end((err, res) => {
        if(!err) done()
      })
  })

})
