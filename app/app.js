// Npm modules
var express = require('express')
var app = express()
var path = require('path')
var bodyParser = require('body-parser')
var passport = require('passport')
var session = require('express-session')
var env = process.env

// Routers
var search = require('./backend/search/router.js')
var auth = require('./backend/auth/router.js')

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
	// Do basic routing
	app.use(express.static(path.join(__dirname, './frontend/static')))
	search(app)
	auth(app, passport)
	return app;
}


