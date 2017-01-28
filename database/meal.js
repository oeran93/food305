var mongoose = require('mongoose')
var Schema = mongoose.Schema

var Meal = new Schema({
  _restaurant: {type: Schema.Types.ObjectId, ref: 'Restaurant'},
  name: String,
  price: Number,
  image: String,
  tags: [String], // hot, veggie
  orders: [{type: Schema.Types.ObjectId, ref: 'Order'}]
})

module.exports = mongoose.model('Meal', Meal, 'Meal')
