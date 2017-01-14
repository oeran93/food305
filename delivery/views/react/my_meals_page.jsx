const React = require('react')
const $     = require('jquery')
const Meal  = require('./meal/meal.jsx')
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
          (data) => {console.log(data);this.setState({this_meals: data})}
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
          {this_meals.map(meal => {
            return <Meal
                     key={meal._id}
                     _id={meal._id}
                     name={meal.name}
                     price={meal.price}
                     image={meal.image} 
                     action='hidden'
                     description={'will be delivered on'+this_date}
                     />
           })}
          {next_meals.map(meal => {
              return <Meal
                       key={meal._id}
                       _id={meal._id}
                       name={meal.name}
                       prices={meal.prices}
                       image={meal.image} 
                       action=''
                       description={'will be delivered on'+next_date}
                       />
          })}
        </div>
      </div>
    )
  }

})
