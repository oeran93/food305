const Strategy = require('passport-local').Strategy
const User = require('../../database/user.js')

module.exports = function (passport) {

	passport.serializeUser((user, done) => {
		done(null, user)
	})

	passport.deserializeUser((id, done) => {
		User.findById(id, (err, user) => {
			done(err, user)
		})
	})

	passport.use( new Strategy(
		function (username, password, cb) {
			User.findByUsername(username, (err, user) => {
				if (err) return cb(err)
				if (!user) return cb(null, false)
				if (user.password != password) return cb(null, false)
				return cb(null, user)
			})
		}
	))
	
}