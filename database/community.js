var mongoose = require('mongoose')
var Schema = mongoose.Schema

var Community = new Schema({
  name: String,
  type: String,
  lat: Number,
  lng: Number
})

module.exports = mongoose.model('Community', Community, 'Community')
