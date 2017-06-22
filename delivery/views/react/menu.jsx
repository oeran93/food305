const React     = require('react')
const $         = require('jquery')
const Meal      = require('./meal.jsx')
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
    let station = this.props.user.station
    $.ajax({
      method : 'GET',
      url    : '/get_menu',
      data: {
        station: station,
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
    let {toggleModal} = this.props
    return (
      <div className="menu">
        <div className="row margin-bottom-15">
          <div className="col-xs-12 text-center">
            <h2 className="title col-xs-12">Order now for {date.get_day_of_week(date.this_delivery())}</h2>
          </div>
        </div>
        {meals.map(meal => {
          return (
            <Meal
               key={meal._id}
               meal={meal}
               toggleModal={toggleModal}
            />
          )
        })}
      </div>
    )
  }

}

Menu.propTypes = {
  user: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  toggleModal: PropTypes.func.isRequired
}

module.exports = Menu
