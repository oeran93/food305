module.exports = function (app) {
  app.get('/', (req, res) => {
    if (req.user) {
      var user = req.user.facebook
      res.render('index', {name: user.name, picture: user.picture})
    } else {
      res.render('index')
    }
  })
}
