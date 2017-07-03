var express = require('express');
var router = express.Router();
const date = require ('../../../tools/date.js')()

const Order = require('../../../database/order.js');
const Meal = require('../../../database/meal.js');
const User = require('../../../database/user.js');


function handleError(err){
	console.log(err);
}

var todayOrder = [];


console.log(date.this_delivery().format('MM-DD-YYYY hh:mm a'));

Order.
  find().
  where('date').equals(date.this_delivery().format('MM-DD-YYYY hh:mm a')).
  select('_meal _user')
  .populate(
	[{path:'_meal'}, 
	{path:'_user'}]
  	)
  .exec(function (err, orders) {
  if (err) return handleError(err);
  // todayOrder = orders;
  todayOrder = orders.map(order => 
  		 ({"meal": order._meal.name, "user": order._user.phone})
  	);
  console.log(todayOrder)
});

/* GET users listing. */
router.get('/', function(req, res, next) {
	// Comment out this line:
  //res.send('respond with a resource');

  // And insert something like this instead:

  res.json(todayOrder);

  // res.json([{
  // 	_id: 1,
  // 	_meal: "samsepi0l"
  // }, {
  // 	_id: 2,
  // 	_meal: "D0loresH4ze"
  // }]);

});

module.exports = router;
