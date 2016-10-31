/*
* Generic functions useful for both back and front end
*/

module.exports = {

	/*
	* Gives back the next time meals will be delivered
	* Meals are delivered once a day at noon
	* Meals ordering closes at 10 every day.
	*/
	getDeliveryDate: function () {
		var today = new Date()
    var deliveryDate = (new Date()).setHours(12)
    if (today.getHours() > 12) {
      deliveryDate = deliveryDate + 1
    }
    return deliveryDate
	}

}