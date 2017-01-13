const React        = require('react')
const _            = require('underscore')
const price_people = require('../../../../tools/price_people.js')

module.exports = React.createClass({

	propTypes: {
		people: React.PropTypes.array.isRequired,
		prices: React.PropTypes.array.isRequired,
		nOrders: React.PropTypes.number.isRequired
	},

	render: function() {
		let {people, prices, nOrders} = this.props
		let current_price = price_people.current_price(people, prices,nOrders)
		return (
			<div className='prices clearfix'>
				{prices.map((price,i) => {
					if (price === current_price) {var label = 'label-success'}
					else {var label ='label-default'}
					return (<span key={i} className={label+' price pull-left'}>
	          {'$ ' + price}
	        </span>)
				})}
			</div>
		)
	}

})