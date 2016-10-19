var mongoose = require('mongoose')
var Schema = mongoose.Schema

var Meal = new Schema({
  _restaurant: {type: Schema.Types.ObjectId, ref: 'Restaurant'},
  name: String,
  prices: [Number],
  people: [Number],
  image: String,
  orders: [{type: Schema.Types.ObjectId, ref: 'Order'}]
})

module.exports = mongoose.model('Meal', Meal, 'Meal')
