const db        = require('../../database/test/start.js')
const app       = require('../../delivery/app.js')(db)
const supertest = require('supertest')
const User = require('../../database/user.js')
const should = require('should')
const errors = require('../../tools/errors.js')

describe('local authentication', function () {

  it('creates user when number is sent', done => {
    supertest(app)
    .post('/create_user')
    .send({
      phone: '3143090319'
    })
    .end((err, res) => {
      User.find({phone: '3143090319'}).remove(err => {
        if (err) console.log('User was not removed')
        done()
      })
      res.body.success.should.be.true()
    })
  })

  it('doesnt create user when user exists and activated', done => {
    supertest(app)
    .post('/create_user')
    .send({
      phone: '3143090313'
    })
    .end((err, res) => {
      res.body.error.number.should.equal(errors.user_exists.number)
      done()
    })
  })

  it('realizes the user is not active', done => {
    supertest(app)
    .post('/create_user')
    .send({
      phone: '3143090312'
    })
    .end((err, res) => {
      res.body.error.number.should.equal(errors.user_not_active.number)
      done()
    })
  })

  it('returns success if code is correct', done => {
    supertest(app)
    .post('/check_phone_code')
    .send({
      phone: '3143090313',
      code: '3606'
    })
    .end((err, res) => {
      res.body.success.should.be.true()
      done()
    })
  })

  it('returns error if code is incorrect', done => {
    supertest(app)
    .post('/check_phone_code')
    .send({
      phone: '3143090313',
      code: '1111'
    })
    .end((err, res) => {
      res.body.error.number.should.be.equal(errors.wrong_code.number)
      done()
    })
  })

  it('creates a password if pwd is >= 8 chars and user exists', done => {
    supertest(app)
    .post('/create_password')
    .send({
      phone: '3143090313',
      pwd: 'abcdefgu',
      old_pwd: 'abcdefgu'
    })
    .end((err, res) => {
      res.body.success.should.be.true()
      done()
    })
  })

  it('does not create a password if no old password and a password exists', done => {
    supertest(app)
    .post('/create_password')
    .send({
      phone: '3143090313',
      pwd: 'abcdesdfasdf'
    })
    .end((err, res) => {
      res.body.error.number.should.be.equal(errors.wrong_old_pwd.number)
      done()
    })
  })

  it('does not create a password if pwd is < 8', done => {
    supertest(app)
    .post('/create_password')
    .send({
      phone: '3143090313',
      pwd: 'abcde'
    })
    .end((err, res) => {
      res.body.error.number.should.equal(errors.short_pwd.number)
      done()
    })
  })

  it('does not create a password if user does not exist', done => {
    supertest(app)
    .post('/create_password')
    .send({
      phone: '3143090',
      pwd: 'abcdesdfasdf'
    })
    .end((err, res) => {
      res.body.error.number.should.equal(errors.user_does_not_exist.number)
      done()
    })
  })

  it('logs in if right credentials are provided', done => {
    supertest(app)
    .post('/login')
    .send({
      phone: '3143090313',
      pwd: 'abcdefgu'
    })
    .end((err, res) => {
      res.body.success.should.be.true()
      done()
    })
  })

  it('does not log in if wrong password provided', done => {
    supertest(app)
    .post('/login')
    .send({
      phone: '3143090313',
      pwd: 'abcdpwensdu'
    })
    .end((err, res) => {
      res.body.error.number.should.equal(errors.wrong_old_pwd.number)
      done()
    })
  })

  it('does not log in if wrong phone is provided', done => {
    supertest(app)
    .post('/login')
    .send({
      phone: '3143090333',
      pwd: 'abcdefgu'
    })
    .end((err, res) => {
      res.body.error.number.should.equal(errors.user_does_not_exist.number)
      done()
    })
  })

  it('creates a recovery code and sends it to the user', done => {
    supertest(app)
      .get('/forgot_pwd')
      .query({phone: 3143090319})
      .end((err, res) => {
        if (err) return
        done()
    })
  })

  it('does not recover if code does not match', done => {
    supertest(app)
      .post('/recover_pwd')
      .send({code: 314})
      .end((err, res) => {
        if (err) return
        done()
    })
  })

})
