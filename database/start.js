const mongoose = require('mongoose')
const env = process.env

module.exports = function () {
	const auth = `mongodb://${env.VIMI_DB_USERNAME}:${env.VIMI_DB_PASSWORD}@localhost/${env.VIMI_DB_NAME}`
	mongoose.connect(auth,
		(err, res) => {
			if (err) {
				console.log('db error: ', err.message);
			}
		}
	)
}
