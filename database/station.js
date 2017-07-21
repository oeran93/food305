const mongoose = require('mongoose')
const Schema = mongoose.Schema

var Station = new Schema({
  location: String,
  lat: Number,
  lng: Number,
  schedule: [{type: Schema.Types.ObjectId, ref: 'Restaurant'}]
})

module.exports = mongoose.model('Station', Station, 'Station')
