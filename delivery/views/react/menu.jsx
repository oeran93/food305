const React     = require('react')
const $         = require('jquery')
const Meal      = require('./meal/meal.jsx')
const _         = require('underscore')
const PropTypes = require('prop-types')
const globals = require('../../../tools/globals.js')

class Menu extends React.Component {

  constructor (props) {
    super(props)
    this.state = {restaurants: []}
  }

  componentDidMount () {
    $.ajax({
      method : 'GET',
      url    : '/get_available_meals',
      success: data => {
        this.setState({restaurants: data})
      }
    })
  }

  render () {
    let {restaurants} = this.state
    let {user} = this.props
    return (
      <div className="row menu-page">
        <div className="col-xs-12 col-md-9 col-md-offset-1">
        {restaurants.map(restaurant => {
            return (
              <div className='row' key={restaurant._id}>
                <div className='page-header text-uppercase text-center'>
                  <h3>{restaurant.name}</h3>
                </div>
                {restaurant.meals.map(meal => {
                  return (<Meal
                           key={meal._id}
                           meal={meal}
                           action={user ? 'buy' : 'login'}
                        />)
                })}
              </div>
            )
          })
        }
        </div>
      </div>
    )
  }

}

Menu.propTypes = {
  user: PropTypes.oneOfType([PropTypes.bool, PropTypes.object])
}

module.exports = Menu
