const db = require('../database/start.js')()
const Order = require('../database/order.js')
const User = require('../database/user.js')
const twilio = require('../tools/twilio.js')()
const date = require('../tools/date.js')()

Order.find({date: date.this_delivery().format('MM-DD-YYYY hh:mm a')}, (err, orders) => {
  orders.forEach(o => {
    User.findOne({_id: o._user}, (err, user) => {
      twilio.send_sms(user.phone, "Your food has arrived!")
    })
  })
})
