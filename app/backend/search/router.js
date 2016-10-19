var Search = require('./search.js')()

module.exports = function (app) {
  app.get('/meals', Search.getAll)
  app.post('/order', isLoggedIn, Search.addOrder)
}

function isLoggedIn (req, res, next) {
  if (req.isAuthenticated()) return next()
  res.redirect('/')
}
