const auth = require('../basic_auth.js')()
const validator = require('../../tools/validator.js')()

module.exports = function (app) {
  app.use(auth.session)
  app.post('/create_user', validator.validate_router('name','email'), auth.create_user, (req,res) => res.send())
  app.post('/check_phone_code', auth.check_phone_code, (req,res) => res.send())
  app.post('/create_password', validator.validate_router('pwd') , auth.create_password, (req,res) => res.send())
  app.get('/forgot_pwd', auth.forgot_pwd, (req,res) => res.send())
  app.post('/recover_pwd', auth.recover_pwd, (req,res) => res.send())
  app.get('/sign_out', auth.sign_out, (req,res) => res.send())
  app.post('/sign_in', auth.sign_in, (req,res) => res.send())
}
