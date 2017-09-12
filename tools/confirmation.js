const $ = require('jquery')

module.exports = function () {

  let pub = {}

  /*
  * displays the positive or negative confirmation panel
  * @param type {string} negative or positive
  */
  function confirmation (type) {
    $('.confirmation.'+type).slideToggle('fast')
    setTimeout(() => $('.confirmation.'+type).slideToggle('fast'),2000)
  }

  /*
  * shows a positive confirmation
  * @param message {string} message to display
  */
  pub.success = function (message) {
    if (!message) return
    $('.confirmation.success').html(message)
    confirmation('success')
  }

  /*
  * shows a negative confirmation
  * @param message {string} message to display
  */
  pub.failure = function (message) {
    if (!message) return
    $('.confirmation.failure').html(message)
    confirmation('failure')
  }

  return pub

}