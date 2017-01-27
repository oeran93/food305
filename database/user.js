var mongoose = require('mongoose')
var Schema = mongoose.Schema

var User = new Schema({
  email: String,
  facebook: {
    id: String,
    token: String,
    name: String,
    picture: String,
    gender: String
  }
})

module.exports = mongoose.model('User', User, 'User')
