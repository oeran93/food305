var mongoose = require('mongoose')
var env = process.env

module.exports = function () {
	var auth = `mongodb://${env.VIMI_DB_USERNAME}:${env.VIMI_DB_PASSWORD}@localhost/${env.VIMI_DB_NAME}`
	mongoose.connect(auth,
		(err, res) => {
			if (err) {
				console.log(err.message);
			}
		}
	)	
}
