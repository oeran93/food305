const React = require('react')
const $     = require('jquery')
const Meal  = require('./meal.jsx')
const date  = require('../../../tools/date.js')()

class My_Meals extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      future_meals: []
    }
  }

  componentWillMount () {
    $.get('/get_future_meals',
          {date: date.this_delivery().format('MMM DD YYYY, hh')},
          data => this.setState({future_meals: data})
    )
  }

  render () {
    let {future_meals} = this.state
    if (future_meals.length != 0) {
      return (
        <div className="row margin-bottom-15">
          <div className="col-xs-12">
            <div className='page-header text-center'>
              <h3>My Orders</h3>
            </div>
          </div>
          {future_meals.map(meal => {
            return (<Meal
                     key={meal._id}
                     meal={meal}
                     delivery={date.this_delivery()}
                     orders={meal.orders.length}
                     />)
           })}
        </div>
      )
    }
    return null
  }

}

module.exports = My_Meals
