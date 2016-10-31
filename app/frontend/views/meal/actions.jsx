var React = require('react')

var Actions = React.createClass({

	propTypes: {
		action: React.PropTypes.string.isRequired,
		addMeal: React.PropTypes.func
	},

	getDefaultProps: function () {	
		return {
			addMeal: () => {console.log('pass in a function')}
		}
	},

	render: function() {
		var {action, addMeal} = this.props
		if (action === 'none') return
		return (
			<p className='pull-right'>
        {action === 'buy'
        	&&
	        	<a 
			        className='btn btn-primary btn-outline' 
			        role='button' 
			        onClick={addMeal}>
			        Buy
			      </a>
        }
      </p>
		)
	}

})

module.exports = Actions