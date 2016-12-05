/*
* helper functions to calculate price of items depending on number of people
* that bought it
*
*/
var _ = require('underscore')

module.exports = {
  /*
  * calculates the current price of an item
  * @param people {array} people cutoffs. e.g. [5, 10, 15] means
  *	  price changes at 5 people, 10 people and 15 people
  * @param prices {array} prices cutoffs. e.g [8.25, 7, 6, 5] price is 8.25
  *	  if people less than people[0], 7 if people between people[0] and
  *	  people[1], 6 if people between people[1] and peoplel[2] etc.
  *	@param nOrders {number} current number of orders for a meal
  *	@return {number} current price of the meal
  */
  currentPrice: function (people, prices, nOrders) {
    for (var i = 0; i < _.size(people); i++) {
      if (people[i] > nOrders) return prices[--i]
    }
    return _.min(prices)
  },
  /*
	* calculates default price
	* really simple now. I created a separate method for this in case we need to
	* change logic later we only need to change it here
	* @param prices {array} prices cutoff
	*	@return {number} default price
  */
  defaultPrice: function (prices) {
    return prices[0]
  },
  /*
	* calculates price of next deal
	* @param people {array} people cutoffs. e.g. [5, 10, 15] means
	*				price changes at 5 people, 10 people and 15 people
	* @param prices {array} prices cutoffs. e.g [8.25, 7, 6, 5] price is 8.25
	*				if people less than people[0], 7 if people between people[0] and
	*				people[1], 6 if people between people[1] and peoplel[2] etc.
	*	@param nOrders {number} current number of orders for a meal
	* @return {number} price next deal
  */
  nextPrice: function (people, prices, nOrders) {
    for (var i = 0; i < _.size(people); i++) {
      if (people[i] > nOrders) return prices[i]
    }
    return this.bestPrice(prices)
  },
  /*
	* calculates number of people for next deal
	* @param people {array} people cutoffs. e.g. [5, 10, 15] means
	*				price changes at 5 people, 10 people and 15 people
	* @param prices {array} prices cutoffs. e.g [8.25, 7, 6, 5] price is 8.25
	*				if people less than people[0], 7 if people between people[0] and
	*				people[1], 6 if people between people[1] and peoplel[2] etc.
	*	@param nOrders {number} current number of orders for a meal
	* @return {number} number people for next deal
  */
  nextPeople: function (people,prices,nOrders) {
  	for (var i = 0; i < _.size(people); i++) {
      if (people[i] > nOrders) return people[i]
    }
    return this.bestPeople(people)
  },
  /*
	* calculates the best possible price of a meal
	* @param prices {array}
	* @return {number} best price
  */
  bestPrice: function (prices) {
  	return _.max(prices)
  },
  /*
	* calculates the number of people to get the best price of a meal
	* @param people {array}
	* @return {number} number of people to get best price of a meal
  */
  bestPeople: function (people) {
  	return _.max(people)
  }
}