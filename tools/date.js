  /*
  * Functions to calculate delivery and order dates
  */
  var moment = require('moment-timezone')
  var globals = require('./globals')

  module.exports = function (timezone="US/Central") {

  moment.tz.setDefault(timezone)

  const pub = {}

  const delivery_hours = {
  	'monday': [12.15],
  	'tuesday': [12.15],
  	'wednesday': [12.15],
  	'thursday': [12.15],
  	'friday': [12.15],
  	'saturday': [],
  	'sunday': []
  }
  
  const weekdays = ['Sunday','Monday','Tuesday','Wednesday', 'Thursday', 'Friday', 'Saturday']

  const time_to_deliver = 75 //minutes

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
		let time = (hour_delivery + "").split(".")
  		date.hour(time[0])
  		date.minutes(time[1])
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
  	let minutes_to_delivery = this.this_delivery().diff(moment(), 'minutes')
  	if (minutes_to_delivery < time_to_deliver) {
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
  	return moment(date, globals.order_date_time_format)
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
    return moment().format(globals.order_date_time_format)
  }
  
  /*
  * Calculates the difference between a date in the past and the current time
  * @param past {moment} past date
  * @param time_unit {string} what unit of time should be returned? days, months etc.
  * @return {Number} number of units ago; days by default
  */
  pub.how_long_ago = function (past, time_unit='days') {
    return moment().diff(past,time_unit)
  }
  
  /*
  * Checks if the provided date has happened more than the specified days ago
  * @param date {moment} 
  * @param days {Number} 
  */
  pub.older_than = function (date, days) {
    return pub.how_long_ago(date) > days
  }
  
  /*
  * returns an array of weekdays as strings: ["Sunday", "Monday" ...]
  */
  pub.get_weekdays = function () {
    return weekdays
  }
  
  /*
  * return weekday string for a given integer 0 - 6 
  * 0 will return `Sunday`, 6 will return `Saturday`
  */
  pub.int_to_weekday = function (day) {
    return weekdays[day]
  }
  
  return pub

  }
