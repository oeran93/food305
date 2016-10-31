var React = require('react');

var Basic = React.createClass({

	propTypes: {
		defaultPrice: React.PropTypes.number.isRequired,
		currentPrice: React.PropTypes.number.isRequired,
		name: React.PropTypes.string.isRequired
	},

	render: function() {
		var {defaultPrice, currentPrice, name} = this.props
		return (
			<div>
				<h3 className='food-name'>{name}</h3>
	      <h4>Price {defaultPrice != currentPrice
	        &&
	          <span className='lateral-space'>
	            <strike>{'$' + defaultPrice}</strike>
	          </span>} 
	          <span className='label-success current-price pull-right'>
	            {'$' + currentPrice}
	          </span>
	      </h4>
	    </div>
		);
	}

});

module.exports = Basic;