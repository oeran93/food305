var mongoose = require('mongoose')
var Schema = mongoose.Schema

var Restaurant = new Schema({
  name: String,
  location: {'lat': Number, 'lng': Number},
  phone: String,
  prices: [Number],
  people: [Number],
  closed: [String],
  max_meals: Number,
  meals: [{type: Schema.Types.ObjectId, ref: 'Meal'}]
})

module.exports = mongoose.model('Restaurant', Restaurant, 'Restaurant')
