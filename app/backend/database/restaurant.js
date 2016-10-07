var mongoose = require('mongoose')
var Schema   = mongoose.Schema

var Restaurant = new Schema ({
	name: String,
	location: {'lat':Number, 'lng':Number},
	number: Number,
	meals: [{type: Schema.Types.ObjectId, ref: 'Meal'}]
});

module.exports = mongoose.model('Restaurant',Restaurant,'Restaurant')