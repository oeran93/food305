const auth = require('./auth.js')()
const validator = require('../../tools/validator.js')()

module.exports = function (app) {

  app.use(auth.session)
  app.post('/create_user', validator.validate_router('name','email'), auth.create_user)
  app.post('/check_phone_code', auth.check_phone_code)
  app.post('/create_password', validator.validate_router('pwd') , auth.create_password)
  app.get('/forgot_pwd', auth.forgot_pwd)
  app.post('/recover_pwd', auth.recover_pwd)
  app.get('/logout', auth.logout)
  app.post('/login', auth.login)

}
