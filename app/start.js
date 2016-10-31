/*Npm modules*/
var express = require('express')
var app = express()
var path = require('path')
var _ = require('underscore')
var bodyParser = require('body-parser')
var passport = require('passport')
var session = require('express-session')
var env = process.env

/*Costant values*/
var PORT = 80

/*Database*/
var db = require('./backend/database/start.js')

/*Routers*/
var pages = require('./backend/pages/router.js')
var search = require('./backend/search/router.js')
var auth = require('./backend/auth/router.js')

/*Start DB*/
db()

/*Set up express*/
app.use(bodyParser.json()) // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({extended: true})) // to support Url-encoded bodies
app.use(session({
  secret: env.SESSION_SECRET,
  name: 'session',
  resave: true,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

/*Do basic routing*/
app.use(express.static(path.join(__dirname, './frontend/static')))
search(app)
auth(app, passport)

/*Start the server*/
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})
