  /*
  * Functions to calculate delivery and order dates
  */
  var moment = require('moment-timezone')
  var globals = require('./globals')

  module.exports = function (timezone="US/Central") {

  moment.tz.setDefault(timezone)

  const pub = {}

  const delivery_hours = {
  	'monday': [12],
  	'tuesday': [12],
  	'wednesday': [12],
  	'thursday': [12],
  	'friday': [12],
  	'saturday': [],
  	'sunday': []
  }

  const time_to_deliver = 1

  /*
  * Calculates closest delivery date to a given date
  * @param date {moment} date to start searching from
  * @return {moment} closest delivery date
  */
  let available_delivery = function (date) {
  	let day_delivery = date.format('dddd').toLowerCase()
  	let hour_now = parseInt(date.format('H'))
  	let hour_delivery = delivery_hours[day_delivery].find(h => h > hour_now)
  	if (hour_delivery) {
  		date.hour(hour_delivery)
  		date.minutes(0)
  		date.seconds(0)
  		return date
  	}
  	date.hour(0)
  	date.add(1, 'days')
  	return available_delivery(date)
  }

  /*
  * Calculates the closest delivery date
  * @return {moment} closest delivery date
  */
  pub.this_delivery = function () {
  	let date = moment()
  	return available_delivery(date)
  }

  /*
  * Calculates the next delivery date in moment format
  * @return {moment} next delivery date
  */
  pub.next_delivery = function () {
  	let date = this.this_delivery().add(1, 'days')
  	date.hours(0)
  	return available_delivery(date)
  }

  /*
  * Calculates when an order made now will be delivered
  * @return {moment} this order delivery
  */
  pub.this_order_delivery = function () {
  	let hours_to_delivery = this.this_delivery().diff(moment(), 'hours')
  	if (hours_to_delivery < time_to_deliver) {
  		return this.next_delivery()
  	}
  	return this.this_delivery()
  }

  /*
  * Gets day of the week in name format.
  * If the date is today or tomorrow it will return 'Today' or 'Tomorrow',
  * otherwise it returns the day.
  * @param date {moment}
  * @return day of the week {String}
  */
  pub.get_day_of_week = function (date) {
  	if (date.day() == moment().day()) return "Today"
  	else if (date.day() == moment().day()+1) return "Tomorrow"
  	else return date.format('dddd')
  }

  /*
  * Turns an order date (MM-DD-YYYY HH:mm) into a moment object
  * @param date {String}
  */
  pub.order_date_to_moment = function (date) {
  	return moment(date, globals.order_date_format)
  }
  
  /*
  * Turns an iso date (YYYY-MM-DDTHH:mm:ssZ) into a moment object
  * @param date {String}
  */
  pub.iso_date_to_moment = function (date) {
    return moment(date, globals.iso_date_format)
  }

  /*
  * Calculate time between now and next order starts
  * @return {moment}
  */
  pub.time_to_next_order = function () {
  	return how_long_ago(this.this_delivery())
  }

  /*
  * Returns a properly formatted date of the current time
  * @return {String}
  */
  pub.now = function () {
    return moment().format(globals.order_date_format)
  }
  
  /*
  * Calculates the difference between a date in the past and the current time
  * @param past {moment} past date
  * @return {moment}
  */
  pub.how_long_ago = function (past) {
    return moment.duration(moment().diff(past))
  }

  return pub

  }
