const $ = require('jquery')

module.exports = function () {

  let pub = {}

  /*
  * displays the positive or negative confirmation panel
  * @param type {string} negative or positive
  */
  function confirmation (type) {
    $('.confirmation.'+type).slideToggle('fast')
    setTimeout(() => $('.confirmation.'+type).slideToggle('fast'),5000)
  }

  /*
  * shows a positive confirmation
  * @param message {string} message to display
  */
  pub.success = function (message) {
    $('.confirmation.success').html(message)
    confirmation('success')
  }

  /*
  * shows a negative confirmation
  * @param message {string} message to display
  */
  pub.failure = function (message) {
    $('.confirmation.failure').html(message)
    confirmation('failure')
  }

  return pub

}