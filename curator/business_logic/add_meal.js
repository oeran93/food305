const Station = require('../../database/station.js')
const Meal = require('../../database/meal.js')
const Restaurant = require('../../database/restaurant.js')
const errors = require('../../tools/errors.js')

module.exports = function () {

  let pub = {}

  pub.add_meal = function (req, res) {
    const new_meal = req.body
    Restaurant.findOne({ 'name': new_meal.restaurant })
    .exec((err, restaurant) => {
      if (err) throw err
      else {
        const meal = new Meal({
          name: new_meal.name,
          price: new_meal.price,
          _restaurant: restaurant._id,
          image: new_meal.image,
          description: new_meal.description
        })
        meal.save( (err, saved_meal) => {
          if (err) throw error
          else {
            Restaurant.update(
                { _id: restaurant._id },
                { $push: { meals: saved_meal._id } },
                (err, doc) => {
                  if (err) throw err
                  else res.send(saved_meal.name)
                }
            )
          }
        })
      }

    })
  }

  return pub
}
