var React = require('react')

var MoreInfo = React.createClass({

	propTypes: {
		nextPricePeople: React.PropTypes.object.isRequired,
		bestPricePeople: React.PropTypes.object.isRequired,
		currentPrice: React.PropTypes.number.isRequired,
		orders: React.PropTypes.number.isRequired
	},

	render: function() {
		var {price: bPrice, people: bPeople} = this.props.bestPricePeople
		var {price: nPrice, people: nPeople} = this.props.nextPricePeople
		var {currentPrice: cPrice, orders} = this.props
		return (
			<div>
				{cPrice == bPrice
           ?
             <p>
               You are getting our best deal!
               <br/>
               <span className='badge'>{orders}</span> people bought it
             </p>
           :
             <p>
               If {nPeople - orders} more people buy it, you will pay ${nPrice}
               <br/> 
               	Best deal: {bPeople} people, ${bPrice}
               <br/>
               <span className='badge'>{orders}</span> people bought it
             </p>
        }
			</div>
		)
	}

})

module.exports = MoreInfo