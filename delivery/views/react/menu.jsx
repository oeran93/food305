const React     = require('react')
const $         = require('jquery')
const Meal      = require('./meal/meal.jsx')
import My_Meals from './my_meals.jsx'
const PropTypes = require('prop-types')
const date = require('../../../tools/date.js')()

class Menu extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      restaurant: '',
      meals: []
    }
  }

  componentDidMount () {
    $.ajax({
      method : 'GET',
      url    : '/get_menu',
      data: {
        station: "5942acf346dd0aaa411708fe",
        delivery_day: date.this_delivery().day()
      },
      success: menu => {
        this.setState({
          restaurant: menu.restaurant,
          meals: menu.meals
        })
      }
    })
  }

  render () {
    let {restaurant, meals} = this.state
    let {user} = this.props
    return (
      <div className="row">
        <div className="col-xs-12 col-md-8 col-md-offset-2">
          <div className="row">
              <div className='page-header text-uppercase text-center'>
                <h3>{restaurant}</h3>
              </div>
              {meals.map(meal => {
                return (<Meal
                         key={meal._id}
                         meal={meal}
                         action={user ? 'buy' : 'login'}
                      />)
              })}
          </div>
        </div>
      </div>
    )
  }

}

Menu.propTypes = {
  user: PropTypes.oneOfType([PropTypes.bool, PropTypes.object])
}

module.exports = Menu
