	/*
* Functions to calculate delivery and order dates
*/
var moment = require('moment')

module.exports = {


	/*
	* When will this delivery (closest in time) happen?
	* @return {moment}
	*/
	this_delivery: function () {
		var delivery = moment()
		if (delivery.hours() >= 2) {
			delivery.add(1,'days')
		}
		delivery.hours(14)
		delivery.minutes(0)
		delivery.seconds(0)
		return delivery
	},

	/*
	* When will the next delivery happen?
	* @return {moment}
	*/
	next_delivery: function () {
		var delivery = moment()
		if (delivery.hours() >= 2) {
			delivery.add(1,'days')
		}
		delivery.add(1,'days')
		delivery.hours(14)
		delivery.minutes(0)
		delivery.seconds(0)
		return delivery
	},

	/*
	* If I ordered now, when will it be delivered?
	* @return {moment}
	*/
	this_order_delivery: function () {
		var delivery = moment()
		if (delivery.hours() >= 12) {
			delivery.add(1,'days')
		}
		delivery.hours(2)
		delivery.minutes(0)
		delivery.seconds(0)
		return delivery
	},

	/*
	* When will this order close?
	* @return {moment}
	*/
	this_order_end: function () {
		var delivery = moment()
		if (delivery.hours() >= 12) {
			delivery.add(1,'days')
		}
		delivery.hours(2)
		delivery.minutes(0)
		delivery.seconds(0)
		return delivery
	},

	/*
	* What is the time now on the machine that calls this?
	* @return {moment}
	*/
	now: function () {
		return moment()
	},

	/*
	* How much time until this order closes?
	* @return {moment duration}
	*/
	time_until_order_closed: function () {
		return moment.duration(this.this_order_end().diff(this.now()))
	}

}
