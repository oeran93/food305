const mongoose = require('mongoose')
const Schema = mongoose.Schema

var Meal = new Schema({
  _restaurant: {type: Schema.Types.ObjectId, ref: 'Restaurant'},
  name: String,
  description: String,
  price: Number,
  image: String,
  hidden: Boolean,
  tags: [String], // hot, veggie
  allergens: [String], // peanuts, tree nuts, fish, shellfish, milk, egg, soy, wheat
  orders: [{type: Schema.Types.ObjectId, ref: 'Order'}]
})

module.exports = mongoose.model('Meal', Meal, 'Meal')
