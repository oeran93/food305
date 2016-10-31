var Search = require('./search.js')()

module.exports = function (app) {
  app.get('/getInitialData', Search.getInitialData)
  app.get('/getAllMeals', Search.getAllMeals)
  app.get('/getMyMeals', isLoggedIn, Search.getMyMeals)
  app.post('/postMeal', isLoggedIn, Search.addMeal)
}

function isLoggedIn (req, res, next) {
  if (req.isAuthenticated()) return next()
  res.redirect('/')
}
