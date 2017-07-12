const db        = require('../../../database/start.js')
const app       = require('../../app.js')(db)
const supertest = require('supertest')
const should = require('should')
const date = require('../../../tools/date.js')()

describe('order business logic', () => {

  it('saves an order rating', done => {
    supertest(app)
      .post('/rate_order')
      .send({
        rating: 3,
        order: "5963e2ddd2efd0afe282d1a9"
      })
      .end((err, res) => {
        if (err) return
        res.body.should.have.property("success")
        console.log(res.body.error)
        done()
      })
  })

  it('gets the latest user order', done => {
    supertest(app)
      .get('/get_latest_user_order')
      .end((err, res) => {
        if (err) return
        res.body.should.have.property("success")
        console.log(res.body)
        done()
      })
  })

})
