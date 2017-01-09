var React = require('react')
var _ = require('underscore')
var pricePeople = require('../../../tools/pricePeople.js')

var Price = React.createClass({

	propTypes: {
		people: React.PropTypes.array.isRequired,
		prices: React.PropTypes.array.isRequired,
		nOrders: React.PropTypes.number.isRequired
	},

	render: function() {
		var {people, prices, nOrders} = this.props
		var currentPrice = pricePeople.currentPrice(people, prices,nOrders)
		return (
			<div className='prices clearfix'>
				{prices.map((price,i) => {
					if (price === currentPrice) {var label = 'label-success'}
					else {var label ='label-default'}
					return (<span key={i} className={label+' price pull-left'}>
	          {'$ ' + price}
	        </span>)
				})}
			</div>
		)
	}

})

module.exports = Price