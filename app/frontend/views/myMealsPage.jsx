var React = require('react')
var $ = require('jquery')
var Meal = require('./meal/meal.jsx')
var _ = require('underscore')
var date = require('../../tools/date.js')

var MyMealsPage = React.createClass({
  
  getInitialState: function () {
    return {
      thisMeals: [],
      nextMeals: [],
      thisDate: date.thisDelivery().format('dddd')+' at '+date.thisDelivery().format('hh:mm a'),
      nextDate: date.nextDelivery().format('dddd')+' at '+date.thisDelivery().format('hh:mm a'),
    }
  },

  componentWillMount: function () {
    $.get('/getMyMeals',
          {date: date.thisDelivery().format('MMM DD YYYY, hh')},
          (data) => {this.setState({thisMeals: data})}
    )
    $.get('/getMyMeals',
          {date: date.nextDelivery().format('MMM DD YYYY, hh')},
          (data) => {this.setState({nextMeals: data})}
    )
  },

  render: function () {
    var {thisDate, nextDate, thisMeals, nextMeals} = this.state
    return (
      <div>
        <div className='row'>
          <div className='page-header'>
            <h3>These meals will be delivered on {thisDate}</h3>
          </div>
          {_.map(thisMeals, (meal,index) => {
            return <Meal
                     key={index}
                     _id={meal._id}
                     name={meal.name}
                     prices={meal.prices}
                     people={meal.people}
                     nOrders={_.size(meal.orders)}
                     image={meal.image} 
                     action=''
                     />
           })}
        </div>
        <div className='row'>
          <div className='page-header'>
            <h3>These meals will be delivered on {nextDate}</h3>
          </div>
          {_.map(nextMeals, (meal,index) => {
            return <Meal
                     key={index}
                     _id={meal._id}
                     name={meal.name}
                     prices={meal.prices}
                     people={meal.people}
                     nOrders={_.size(meal.orders)}
                     image={meal.image} 
                     action=''
                     />
           })}
        </div>
      </div>
    )
  }

})

module.exports = MyMealsPage
