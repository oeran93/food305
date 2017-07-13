const auth = require('../basic_auth.js')()
const curator_auth = require('../curator_auth.js')()

module.exports = function (app) {

  app.use(auth.session)
  app.post('/sign_in', auth.sign_in, curator_auth.sign_in, (req, res) => res.send())

}
