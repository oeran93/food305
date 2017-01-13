const React = require('react')
const $     = require('jquery')
const Meal  = require('./meal/meal.jsx')
const _     = require('underscore')
const date  = require('../../../tools/date.js')

module.exports = React.createClass({
  
  getInitialState: function () {
    return {
      this_meals: [],
      next_meals: [],
      this_date: date.this_delivery().format('dddd')+' at '+date.this_delivery().format('hh:mm a'),
      next_date: date.next_delivery().format('dddd')+' at '+date.this_delivery().format('hh:mm a'),
    }
  },

  componentWillMount: function () {
    $.get('/get_my_meals',
          {date: date.this_delivery().format('MMM DD YYYY, hh')},
          (data) => {this.setState({this_meals: data})}
    )
    $.get('/get_my_meals',
          {date: date.next_delivery().format('MMM DD YYYY, hh')},
          (data) => {this.setState({next_meals: data})}
    )
  },

  render: function () {
    let {this_date, next_date, this_meals, next_meals} = this.state
    return (
      <div>
        <div className='row'>
          <div className='page-header'>
            <h3>These meals will be delivered on {this_date}</h3>
          </div>
          {_.map(this_meals, (meal,index) => {
            return <Meal
                     key={index}
                     _id={meal._id}
                     name={meal.name}
                     prices={meal.prices}
                     people={meal.people}
                     nOrders={_.size(meal.orders)}
                     image={meal.image} 
                     action='hidden'
                     />
           })}
        </div>
        <div className='row'>
          <div className='page-header'>
            <h3>These meals will be delivered on {next_date}</h3>
          </div>
          {_.map(next_meals, (meal,index) => {
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
