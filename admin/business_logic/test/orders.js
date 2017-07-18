const db        = require('../../../database/start.js')
const app       = require('../../app.js')(db)
const supertest = require('supertest')
const should = require('should')
const date = require('../../../tools/date.js')()
const globals = require('../../../tools/globals.js')

describe('orders business logic', () => {

  it('gets closest delivery orders', done => {
    supertest(app)
      .get('/delivery_orders')
      .query({
        date: date.this_delivery().format(globals.order_date_format)
      })
      .end((err, res) => {
        if (err) return
        console.log(res.body)
        done()
      })
  })

})
