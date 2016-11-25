/*
* Functions to calculate delivery and order dates
*/
var moment = require('moment')

module.exports = {


	/*
	* When will this delivery (closest in time) happen?
	* @return {moment}
	*/
	thisDelivery: function () {
		var delivery = moment()
		if (delivery.hours() >= 12) {
			delivery.add(1,'days')
		}
		delivery.hours(12)
		delivery.minutes(0)
		delivery.seconds(0)
		return delivery
	},

	/*
	* When will the next delivery happen?
	* @return {moment}
	*/
	nextDelivery: function () {
		var delivery = moment()
		if (delivery.hours() >= 12) {
			delivery.add(1,'days')
		}
		delivery.add(1,'days')
		delivery.hours(12)
		delivery.minutes(0)
		delivery.seconds(0)
		return delivery
	},

	/*
	* If I ordered now, when will it be delivered?
	* @return {moment}
	*/
	thisOrderDelivery: function () {
		var delivery = moment()
		if (delivery.hours() >= 10) {
			delivery.add(1,'days')
		}
		delivery.hours(12)
		delivery.minutes(0)
		delivery.seconds(0)
		return delivery
	},

	/*
	* When will this order close?
	* @return {moment}
	*/
	thisOrderEnd: function () {
		var delivery = moment()
		if (delivery.hours() >= 10) {
			delivery.add(1,'days')
		}
		delivery.hours(10)
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
	timeUntilOrderClosed: function () {
		return moment.duration(this.thisOrderEnd().diff(this.now()))
	}

}
