var mongoose = require('mongoose')
var Schema = mongoose.Schema

var User = new Schema({
  phone: {type: String, required: true, unique: true},
  code: String,
  activated: String,
  name: String,
  email: {type: String, unique: true},
  pwd: String,
  salt: String,
  station: {type: Schema.Types.ObjectId, ref: 'Station'},
  created_at: Date
})

module.exports = mongoose.model('User', User, 'User')
