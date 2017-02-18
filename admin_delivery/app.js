const express     = require('express')
const app         = express()
const body_parser = require('body-parser')
const passport    = require('passport')
const session     = require('express-session')
const env         = process.env

module.exports = function (db) {
  //start DB
  db()
  //set up express
  app.use(body_parser.json())
  app.use(body_parser.urlencoded({extended: true}))
  app.use(session({
    secret: env.VIMI_SESSION_SCRT,
    name: 'session',
    resave: true,
    saveUninitialized: true
  }))
  app.use(passport.initialize())
  app.use(passport.session())
  app.use(express.static(__dirname + '/views/'))

  return app
}