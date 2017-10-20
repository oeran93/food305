const mongoose = require('mongoose')
const Schema = mongoose.Schema

var Promotion = new Schema({
  _user: {type: Schema.Types.ObjectId, ref: 'User'},
  name: String,
  discount: Number,
  activated: Boolean,
  used: {type: Boolean, default: false},
  type: String,
  referred_email: String
})

module.exports = mongoose.model('Promotion', Promotion, 'Promotion')
