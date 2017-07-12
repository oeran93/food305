const _ = require('underscore')
const errors = require('./errors.js')

/*
* This file validates any input whose name is a property of the validar object
* validates any input that is specified in the validator object
*/

const valid = {

  name: {
    func: (name) => {
      return name.length > 0
    },
    error: errors.invalid_name
  },

  email: {
    func: (email) => {
      let regx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return regx.test(email)
    },
    error: errors.invalid_email
  },

  pwd: {
    func: (pwd) => {
      return pwd.length > 7
    },
    error: errors.short_pwd
  },

  rating: {
    func: (rating) => {
      return !isNaN(rating) && rating > 0 && rating < 6
    },
    error: errors.invalid_rating
  }

}

module.exports = function () {

  let pub = {}

  /*
  * Returns a router-ready function to validate input
  * @params comma separated list of strings of the name of args to be validated
  */
  pub.validate_router = function (...args) {
    return (req, res, next) => {
      let issues = pub.validator(args, req.method === "POST" ? req.body : req.query)
      if (_.size(issues)) res.send({error: issues[0]})
      else next()
    }
  }

  /*
  * Validates the properties of infos that are listed in to_validate
  * @param to_validate {array} name of argsa to be validated
  * @param infos {object} properties to be validated
  */
  pub.validator = function (to_validate, infos) {
    let res = []
    to_validate.map((name) => {
      if (!valid[name].func(infos[name])) res.push(valid[name].error)
    })
    return res
  }

  return pub

}
