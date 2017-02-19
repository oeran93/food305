var mongoose = require('mongoose')
var Schema = mongoose.Schema

var User = new Schema({
  phone: String,
  name: String,
  email: String,
  password: String,
  gender: String,
  picture: String
})

module.exports = mongoose.model('User', User, 'User')
