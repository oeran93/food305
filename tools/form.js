const _ = require('underscore')

module.exports = function () {

  let pub = {}

  pub.error = {}

  pub.error.empty = function (value) {
    return _.isEmpty(value)
  }

  pub.error.out_of_range = function (min, max) {
    return (val) => val < min || val > max
  }

  pub.error.invalid_email = function (email) {
    let email_reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return !email_reg.test(email)
  }

  return pub

}