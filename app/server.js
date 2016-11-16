var database = require('./backend/database/start.js')
var app = require('./app.js')(database)
var port = 80

/*Start the server*/
app.listen(port, () => {
  console.log(`server running on port ${port}`)
})