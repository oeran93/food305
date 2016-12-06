var FacebookStrategy = require('passport-facebook').Strategy
var User = require('../database/user.js')
var env = process.env

module.exports = function (passport) {
  passport.serializeUser((user, done) => {
    done(null, user)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })

  passport.use(new FacebookStrategy({
    clientID: env.FB_CLIENT_ID,
    clientSecret: env.FB_CLIENT_SCRT,
    callbackURL: env.FB_CALLBACK,
    profileFields: ['id', 'name', 'picture', 'gender']
  }, facebookAuth))
}

function facebookAuth (token, refreshToken, profile, done) {
  User.findOne({'facebook.id': profile.id}, (err, user) => {
    if (err) return done(err)
    if (user) {
      return done(null, user)
    }else {
      var newUser = new User()
      newUser.facebook.id = profile.id
      newUser.facebook.token = token
      newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName
      newUser.facebook.picture = profile.photos[0].value
      newUser.facebook.gender = profile.gender
      newUser.save((err) => {
        if (err) throw err
        return done(null, newUser)
      })
    }
  })
}
