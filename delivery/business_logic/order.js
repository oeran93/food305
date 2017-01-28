var Meal  = require('../../database/meal.js')
var Order = require('../../database/order.js')

module.exports = function () {

  var public = {}

  public.add_order = function (req,res) {
    var order = new Order({
      _meal: req.body.meal,
      _user: req.user.id,
      date: req.body.date
    })
    order.save((err) => {
      if (err) { throw err}
      Meal.update(
        {_id: req.body.meal},
        {$push: {'orders': order._id}},
        {},
        () => res.sendStatus(200)
      )
    })
  }

  return public

}
