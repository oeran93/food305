const mongoose = require('mongoose')
const Schema = mongoose.Schema

var Order = new Schema({
  _meal: {type: Schema.Types.ObjectId, ref: 'Meal'},
  _user: {type: Schema.Types.ObjectId, ref: 'User'},
  _station: {type: Schema.Types.ObjectId, ref: 'Station'},
  date: String,
  purchase_time: String,
  rating: Number
})

module.exports = mongoose.model('Order', Order, 'Order')
