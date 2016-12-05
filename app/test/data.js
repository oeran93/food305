var app = require('../app.js')()
var should = require('should')
var supertest = require('supertest')
var date = require('../tools/date.js')
var moment = require('moment')

describe('date', () => {

  it('should return today or tomorrw at 12pm', (done) => {
    date.getDeliveryDate().should.equal('2016 November Sunday, 12')
    done()
  })

  it('should return today or tomorrw at 12pm', (done) => {
    date.getOrderDate().should.equal('2016 November Sunday, 12')
    done()
  })


})