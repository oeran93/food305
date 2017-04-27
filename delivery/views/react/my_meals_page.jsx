const React = require('react')
const $     = require('jquery')
const Meal  = require('./meal/meal.jsx')
const date  = require('../../../tools/date.js')()

class My_Meals_Page extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      this_meals: [],
      next_meals: []
    }
  }

  componentWillMount () {
    $.get('/get_my_meals',
          {date: date.this_delivery().format('MMM DD YYYY, hh')},
          data => this.setState({this_meals: data})
    )
    $.get('/get_my_meals',
          {date: date.next_delivery().format('MMM DD YYYY, hh')},
          data => this.setState({next_meals: data})
    )
  }

  render () {
    let {this_meals, next_meals} = this.state
    if (this_meals.length == 0 && next_meals.length == 0) {
      return (
        <div className='text-center text-uppercase red-text no-meals'>
          Hungry ? Check out <a href='/'> our meals </a>
        </div>
      )
    }
    return (
      <div className='row'>
        {this_meals.map(meal => {
          return (<Meal
                   key={meal._id}
                   meal={meal}
                   delivery={date.this_delivery()}
                   orders={meal.orders.length}
                   />)
         })}
        {next_meals.map(meal => {
          return (<Meal
                   key={meal._id}
                   meal={meal}
                   delivery={date.next_delivery()}
                   orders={meal.orders.length}
                   />)
        })}
      </div>
    )
  }

}
module.exports = My_Meals_Page
