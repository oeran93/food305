const express    = require('express')
const app        = express()
const path       = require('path')
const bodyParser = require('body-parser')
const passport   = require('passport')
const session    = require('express-session')
const env        = process.env

const searchRouter = require('./backend/search/router.js')
const authRouter   = require('./backend/auth/router.js')

module.exports = function (db) {
  // Start DB
  db() 
  // Set up express
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(session({
    secret: env.SESSION_SECRET,
    name: 'session',
    resave: true,
    saveUninitialized: true
  }))
  app.use(passport.initialize())
  app.use(passport.session())
  app.use(express.static(path.join(__dirname, './frontend/static')))
  searchRouter(app)
  authRouter(app, passport)
  return app
}


