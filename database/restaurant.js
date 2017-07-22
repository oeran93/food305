const mongoose = require('mongoose')
const Schema = mongoose.Schema

var Restaurant = new Schema({
  name: String,
  catch_phrase: String,
  location: {'lat': Number, 'lng': Number},
  phone: String,
  closed: [String],
  max_meals: Number,
  meals: [{type: Schema.Types.ObjectId, ref: 'Meal'}],
})

module.exports = mongoose.model('Restaurant', Restaurant, 'Restaurant')
