const express     = require('express')
const app         = express()
const body_parser = require('body-parser')
const session     = require('client-sessions')
const env         = process.env

const user_router = require('./router.js')
const auth_router   = require('../auth/routing/user.js')
const router_first = require('./router_first.js')

module.exports = function (db) {
  //start DB
  db()
  //set up express
  app.use(body_parser.json())
  app.use(body_parser.urlencoded({extended: true}))
  app.use(session(
    {
      cookieName: 'session',
      secret: env.VIMI_SESSION_SCRT,
      duration: 15 * 24 * 60 * 1000,
      activeDuration: 2 * 24 * 60 * 1000
    }
  ))

  /*Serving static content*/
  app.use(express.static(__dirname + '/views/static'))

  /*Every routes in here is taken before any other*/
  router_first(app)
  
  /*Modules Router*/
  user_router(app)
  auth_router(app)

  return app
}
