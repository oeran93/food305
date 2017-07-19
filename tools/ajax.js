const $ = require('jquery')
const confirmation = require('./confirmation.js')()

module.exports = function () {

  let pub = {}

  /*
  * takes care of ajax calls
  * @param object 
  *   method {String} GET or POST
  *   url    {String}
  *   data   {Object}
  *   success {function} callback to execute if everything goes fine. do not show confirmation messages here! rather pass them in as success messages
  *   error   {function} callback to execute if something goes wrong. do not show confirmation messages here! rather pass them in as error messages
  *   success_message {String} message to display on success
  *   error_message {String} message to display on error. if empty and show_messages is true the messager coming from the server will be displayed
  *   show_loading {bool}
  *   show_messages {bool}
  *   
  */
  pub.call = function ({method, url, data, success, error, success_message, error_message, show_loading, show_messages}) {
    if (show_loading) $('.loading-background').css('display','block')
    $.ajax({
      method,
      url,
      data,
      success: (res) => {
        if (res.error) {
          if (show_messages) confirmation.failure(error_message || res.error.message)
          error(res)
        } else {
          if (show_messages) confirmation.success(success_message)
          success(res)
        }
      },
      error: (res) => {
        confirmation.failure('Something went wrong, are you connected to the internet?')
      },
      done: () => {if (show_loading) $('.loading-background').css('display','none')}
    })
  }

  return pub

}
