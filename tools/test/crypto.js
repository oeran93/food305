const should = require('should')
const priv_crypto = {}
const crypto = require('../crypto.js')(priv_crypto)
const salt = 'hsdfj6789e'
const pwd = 'abcdegfd'
const sha512 = crypto.sha512(pwd,salt)

describe('crypto tool', done => {

  it('should create a 10 chars salt', done => {
    priv_crypto.create_salt().should.be.instanceOf(String).and.have.lengthOf(10)
    done()
  })

  it('should create a sha512 hash of password', done => { 
    crypto.sha512(pwd,salt).should.be.instanceOf(String).and.have.lengthOf(128)
    done()
  })

  it('should be able to recreate hash given a password and salt', done => {
    crypto.sha512(pwd,salt).should.equal(sha512)
    done()
  })

  it('should create a salt and password given a string password', done => {
    let {hash_pwd, salt} = crypto.hash_password(pwd)
    salt.should.be.instanceOf(String).and.have.lengthOf(10)
    hash_pwd.should.be.instanceOf(String).and.have.lengthOf(128)
    done()
  })

})