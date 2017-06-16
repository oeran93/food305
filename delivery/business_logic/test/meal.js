const db        = require('../../../database/test/start.js')
const app       = require('../../app.js')(db)
const supertest = require('supertest')
const should = require('should')
const date = require('../../../tools/date.js')()

describe('meal business logic', () => {

  it('get todays menu', done => {
    supertest(app)
      .get('/get_menu')
      .query({
        station: "5942acf346dd0aaa411708fe",
        delivery_day: date.this_delivery().day()
      })
    .end((err, res) => {
      if (err) return
      res.body.should.have.property("restaurant")
      res.body.should.have.property("meals")
      done()
    })
  })

})
