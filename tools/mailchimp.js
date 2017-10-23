const axios = require('axios')
const globals = require('./globals.js')

module.exports = function () {
  
  const pub = {}
  
  pub.add_user_to_daily_menu = function (email_address) {
    const list_id = '055e5c2d33'
    return axios({
      method: 'POST',
      baseURL: `https://us16.api.mailchimp.com/3.0/lists/${list_id}/members`,
      headers: {'Authorization': `user ${globals.mailchimp_apikey}`},
      data: {
        email_address,
        status: 'subscribed'
      }
    }).catch(() => {})
  }
  
  return pub
  
}