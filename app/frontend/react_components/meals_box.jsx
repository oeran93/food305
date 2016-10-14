var React    = require('react')
var ReactDom = require('react-dom')
var $        = require('jquery')
var Meal    = require('./meal.jsx')
var _        = require('underscore')

var MealsBox = React.createClass({

	getInitialState: function () {
		return {
			restaurants: []
		}
	},

	componentWillMount: function () {
		$.ajax({
			method: "GET",
			url: "/meals",
			success: (data) => {
				this.setState({restaurants:data})
			}
		})
	},

	render: function() {
		return (
			<div>
				{_.map(this.state.restaurants,(restaurant) => {
						return (
							<div className= "row" key ={restaurant._id}>
								<div className='page-header'>
									<h3>
										{restaurant.name}
									</h3>
								</div>
								{_.map(restaurant.meals, (meal) => {
									return <Meal
										key = {meal._id}
										_id = {meal._id}
										name = {meal.name}
										prices = {meal.prices}
										people = {meal.people}
										orders = {_.size(meal.orders)}
										image = {meal.image}
									/>
								})}
							</div>
						)	

				})}
			</div>
		)
	}

})

ReactDom.render(<MealsBox/>,document.getElementById('meals-box'))

