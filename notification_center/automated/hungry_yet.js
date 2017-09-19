const db = require('../../database/start.js')()
const Order = require('../../database/order.js')
const User = require('../../database/user.js')
const moment = require('moment')
const _ = require('underscore')
const send = require('../send.js')

Order.find({date: {$regex: `${moment().format('MM-DD-YYYY')}.*`}})
  .populate('_user')
  .exec((err, orders) => {
    if (err) return
    const users_that_ordered = _.pluck(_.pluck(orders, "_user"), "phone")
    User.find({phone: {$nin: users_that_ordered}}, (err, users) => {
      users.forEach(user => {
        send(user)
          .message('hungry_yet')
          .text_and_email()
      })
    })
  })