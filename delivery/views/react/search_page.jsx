const React = require('react')
const $     = require('jquery')
const Meal  = require('./meal/meal.jsx')
const _     = require('underscore')
const date  = require('../../../tools/date.js')


module.exports = React.createClass({

  propTypes: {
    user: React.PropTypes.object
  },
  
  getInitialState: function () {
    return {
      restaurants: []
    }
  },

  childContextTypes: {
    user: React.PropTypes.object
  },

  getChildContext: function () {
    return {user: this.props.user}
  },

  componentDidMount: function () {
    $.ajax({
      method : 'GET',
      url    : '/get_all_meals',
      success: (data) => {
        this.setState({restaurants: data})
      }
    })
  },

  render: function () {
    let {restaurants} = this.state
    let {user} = this.props
    return (
      <div>
        {_.map(restaurants, (restaurant) => {
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
                           price={meal.price}
                           image={meal.image}
                           action={user ? 'buy' : 'login'}/>
                })}
             </div>
           )
         })}
      </div>
    )
  }

})
