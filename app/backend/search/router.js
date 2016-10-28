var Search = require('./search.js')()

module.exports = function (app) {
  app.get('/getAllMeals', Search.getAllMeals)
  app.get('/getMyMeals', Search.getMyMeals)
  app.post('/postOrder', isLoggedIn, Search.addOrder)
}

function isLoggedIn (req, res, next) {
  if (req.isAuthenticated()) return next()
  res.redirect('/')
}
