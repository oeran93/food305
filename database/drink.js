const mongoose = require('mongoose')
const Schema = mongoose.Schema

var Drink = new Schema({
  name: String,
  price: Number,
  image: String,
  hidden: Boolean,
  tags: [String], //sweet, bitter
  allergens: [String], // peanuts, tree nuts, fish, shellfish, milk, egg, soy, wheat
  orders: [{type: Schema.Types.ObjectId, ref: 'Order'}]
})

module.exports = mongoose.model('Drink', Drink, 'Drink')
