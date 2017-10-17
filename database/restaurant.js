const mongoose = require('mongoose')
const Schema = mongoose.Schema

var Restaurant = new Schema({
  name: String,
  catch_phrase: String,
  location: {'lat': Number, 'lng': Number},
  phone: {type: String, default: ''},
  closed: {type: [String], default: []},
  max_meals: {type: Number,  default: 20},
  meals: [{type: Schema.Types.ObjectId, ref: 'Meal'}],
  created_at: {type: Date, default: Date.now}
})

module.exports = mongoose.model('Restaurant', Restaurant, 'Restaurant')
