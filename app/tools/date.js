/*
* Generic functions useful for both back and front end
*/
var moment = require('moment')

module.exports = {


	thisDelivery: function () {
		var delivery = moment()
		if (delivery.hours() >= 12) {
			delivery.add(1,'days')
		}
		delivery.hours(12)
		return delivery
	},

	nextDelivery: function () {
		var delivery = moment()
		if (delivery.hours() >= 12) {
			delivery.add(1,'days')
		}
		delivery.add(1,'days')
		delivery.hours(12)
		return delivery
	},

	thisOrder: function () {
		var delivery = moment()
		if (delivery.hours() >= 10) {
			delivery.add(1,'days')
		}
		delivery.hours(12)
		return delivery
	},

	now: function () {
		return moment()
	}

}
