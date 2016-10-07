var mongoose = require('mongoose')
var env = process.env

module.exports = function () {
	var auth = `mongodb://${env.DB_USERNAME}:${env.DB_PASSWORD}@localhost/food305_db`
	mongoose.connect(auth,
		(err, res) => {
			if (err) {
				console.log(err.message);
			}
		}
	)	
}
