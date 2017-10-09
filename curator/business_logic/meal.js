const Station = require('../../database/station.js')
const Meal = require('../../database/meal.js')
const Restaurant = require('../../database/restaurant.js')
const errors = require('../../tools/errors.js')
const _ = require('underscore')

module.exports = function () {

  let pub = {}

  pub.add = function (req, res) {
    const meal = new Meal(_.extend({},req.body,{hidden: true}))
    meal.save((err, saved_meal) => {
      if (err) throw err
      Restaurant.update(
          { _id: req.body._restaurant },
          { $push: { meals: saved_meal._id } },
          (err, doc) => {
            if (err) throw err
            else res.send(saved_meal.name)
          }
      )
    })
  }
  
  pub.edit = function (req, res) {
    const _id = req.body._id
    Meal.findOneAndUpdate({_id}, req.body, (err, meal) => {
      if (err, !meal) throw err
      else res.send(meal.name)
    })
  }
  
  pub.change_visibility = function (req, res) { 
    Meal.update(
      { _id: req.body._id }
      ,{ $set: { hidden: req.body.hidden }}
      ,(err) => {
        if (err) throw error
        else res.send("success")
      }
    )
  }
  
  pub.delete = function (req,res) {
    Meal.remove({_id: req.body.id}, err => {
      if (err) throw err
      res.send({})
    })
  }

  return pub
}
