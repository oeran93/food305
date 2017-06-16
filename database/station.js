var mongoose = require('mongoose')
var Schema = mongoose.Schema

var Station = new Schema({
  location: String,
  lat: Number,
  lng: Number,
  schedule: []
})

module.exports = mongoose.model('Station', Station, 'Station')
