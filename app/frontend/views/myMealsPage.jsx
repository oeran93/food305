var React = require('react')
var $ = require('jquery')
var Meal = require('./meal.jsx')
var _ = require('underscore')

var MyMealsPage = React.createClass({
  
  getInitialState: function () {
    return {
      meals: []
    }
  },

  componentWillMount: function () {
    $.ajax({
      method: 'GET',
      url: 'getMyMeals',
      success: (data) => {
        this.setState({meals: data})
      }
    })
  },

  render: function () {
    return (
      <div className='row'>
        <div className='page-header'>
          <h3>Coming at {Date.now()}</h3>
        </div>
        {_.map(this.state.meals, (meal) => {
          return <Meal
                   key={meal._id}
                   _id={meal._id}
                   name={meal.name}
                   prices={meal.prices}
                   people={meal.people}
                   orders={_.size(meal.orders)}
                   image={meal.image} />
         })}
      </div>
    )
  }

})

module.exports = MyMealsPage
