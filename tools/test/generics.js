const should = require('should')
const generics = require('../generics.js')

describe('generics tool', function () {

  it('should create a random number', done => {
    let rand_num = generics.rand_number(7)
    let is_right_size = rand_num < 10000000 && rand_num > 999999
    is_right_size.should.be.true()
    done()
  })

})