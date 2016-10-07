var Search = require('./search.js')
var Search = Search()

module.exports = function (app) {

	app.get('/meals', Search.getAll)
	app.post('/order', Search.addOrder)
	
}