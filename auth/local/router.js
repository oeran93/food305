const model = require('./model.js')

module.exports = function (app) {

  app.use(model.session)
  app.post('/create_user', model.create_user)
  app.post('/check_phone_code', model.check_phone_code)
  app.post('/create_password', model.create_password)
  app.get('/logout', model.logout)
  app.post('/login', model.login)

}