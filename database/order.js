const mongoose = require('mongoose')
const Schema = mongoose.Schema

var Order = new Schema({
  _meal: {type: Schema.Types.ObjectId, ref: 'Meal'},
  _user: {type: Schema.Types.ObjectId, ref: 'User'},
  date: String,
  purchase_time: String
})

module.exports = mongoose.model('Order', Order, 'Order')
