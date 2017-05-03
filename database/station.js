var mongoose = require('mongoose')
var Schema = mongoose.Schema

var Station = new Schema({
  name: String,
  community: {type: Schema.Types.ObjectId, ref: 'Community'},
  location: String,
  lat: Number,
  lng: Number,
  open: [Object],
  restaurants: [{type: Schema.Types.ObjectId, ref: 'Restaurant'}]
})

module.exports = mongoose.model('Station', Station, 'Station')
