const React = require('react')
const $     = require('jquery')
const Meal  = require('./meal/meal.jsx')
const _     = require('underscore')
const date  = require('../../../tools/date.js')

module.exports = React.createClass({

  propTypes: {
    logged: React.PropTypes.string
  },
  
  getInitialState: function () {
    return {
      restaurants: []
    }
  },

  componentWillMount: function () {
    $.ajax({
      method : 'GET',
      url    : '/get_all_meals',
      data   : {date: date.this_order_delivery().format('MMM DD YYYY, hh')},
      success: (data) => {
        this.setState({restaurants: data})
      }
    })
  },

  render: function () {
    return (
      <div>
        {_.map(this.state.restaurants, (restaurant) => {
           return (
             <div className='row' key={restaurant._id}>
               <div className='page-header'>
                 <h3>{restaurant.name}</h3>
               </div>
               {_.map(restaurant.meals, (meal) => {
                  return <Meal
                           key={meal._id}
                           _id={meal._id}
                           name={meal.name}
                           prices={meal.prices}
                           people={meal.people}
                           nOrders={_.size(meal.orders)}
                           image={meal.image} 
                           action={this.props.logged ? 'buy' : 'login'}/>
                })}
             </div>
           )
         })}
      </div>
    )
  }

})
