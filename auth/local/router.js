

module.exports = function (app, passport) {

  app.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
  })

  app.get('/failed_login', (req, res) => {
    res.send({error: true})
  })

  app.post('/login', passport.authenticate('local', { failureRedirect: '/failed_login' }), (req, res) => {
    res.redirect('/')
  })

}