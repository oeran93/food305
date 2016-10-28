module.exports = function (app) {
  app.get('/', (req, res) => {
    if (req.user) {
      var user = req.user.facebook
      res.render('index', {name: user.name, picture: user.picture})
    } else {
      res.render('index')
    }
  })

  app.get('/myMeals', isLoggedIn , (req, res) => {
    var user = req.user.facebook
    res.render('myMeals', {name: user.name, picture: user.picture})
  })
}

function isLoggedIn (req, res, next) {
  if (req.isAuthenticated()) return next()
  res.redirect('/')
}
