/*Npm modules*/
var express = require('express')
var app     = express()
var path    = require('path')
var _       = require('underscore')
var bodyParser = require('body-parser')
/*Costant values*/
var PORT    = 80
/*Database*/
var db = require('./backend/database/start.js')
/*Routers*/
var search = require('./backend/search/router.js')

/*Start DB*/
db()

/*Do the routing*/
app.use(bodyParser.json())       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({extended: true})) //to support Url-encoded bodies
app.use(express.static(path.join(__dirname,'./frontend/static')))
search(app)

/*Start the server*/
app.listen(PORT, () => {
	console.log(`server running on port ${PORT}`)
})

