const should = require('should')
const date   = require('../date.js')()

describe('date tool', function () {

  it('should return this coming delivery date and time', done => {
    date.this_delivery().hour().should.equal(14)
    date.this_delivery().date().should.equal(15)
    done()
  })

  it('should return next delivery date and time', done => {
    date.next_delivery().hour().should.equal(14)
    date.next_delivery().date().should.equal(21)
    done()
  })

  it('should return this order delivery', done => {
    date.this_order_delivery().date().should.equal(15)
    date.this_order_delivery().hour().should.equal(14)
    done()
  })

})