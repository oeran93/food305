const mongoose = require('mongoose')
const env = process.env

module.exports = function () {
  const auth = `mongodb://test:1234@localhost/vimi_test_db`
  mongoose.connect(auth,
    (err, res) => {
      if (err) {
        console.log(err.message);
      }
    }
  ) 
}
