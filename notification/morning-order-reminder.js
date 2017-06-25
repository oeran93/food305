const db = require('../database/start.js')()
const User = require('../database/user.js')
const twilio = require('../tools/twilio.js')()

User.find({}, 'phone', (err, users) => {
  users.forEach(u => {
    twilio.send_sms(u.phone, "Hungry yet? remember to order your lunch on Vimi.
      Today's order closes at 11 am. Your order will be delivered at noon"
    )
  })
})
