// const db        = require('../../database/start.js')
// const app       = require('../../curator/app.js')(db)
// const supertest = require('supertest')
// const should = require('should')
//
// describe('curator authentication', () => {
//
//   it('does not allow access to non curators - NEED TO INSERT NON CURATOR CREDENTIALS', done => {
//     supertest(app)
//       .post('/sign_in')
//       .send({
//         phone: "XXXXX",
//         pwd: "xxxx"
//       })
//       .end((err, res) => {
//         if (err) return
//         res.body.should.have.property('error')
//         console.log(res.body)
//         done()
//       })
//   })
//
// })
