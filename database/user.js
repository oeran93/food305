var mongoose = require('mongoose')
var Schema = mongoose.Schema

var User = new Schema({
  phone: {type: String, required: true},
  code: String,
  activated: String,
  name: String,
  email: String,
  pwd: String,
  salt: String,
  created_at: Date
})

module.exports = mongoose.model('User', User, 'User')
