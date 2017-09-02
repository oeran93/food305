const React       = require('react')
const PropTypes   = require('prop-types')
const Rating      = require('./rating.jsx')
const Menu_Banner = require('./menu_banner.jsx')
import Meal from './meal.jsx'
const ajx         = require('../../../tools/ajax.js')()
const globals     = require('../../../tools/globals.js')

class Menu extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      restaurant: {},
      meals: []
    }
  }

  componentWillMount () {
    let {router} = this.context
    ajx.call({
        method: "GET",
        url: "/get_menu",
        success: (menu) => this.setState({restaurant: menu.restaurant, meals: menu.meals}),
        redirect: router.history,
        show_loading: true
    })
  }

  render () {
    let {restaurant, meals} = this.state
    return (
      <div>
        <Menu_Banner meals={meals} restaurant={restaurant}/>
        <Rating />
        <div className="container menu">
          <div className="row">
            {meals.map(meal => {
              return <Meal key={meal._id} meal={meal}/>
            })}
          </div>
        </div>
      </div>
    )
  }

}

Menu.contextTypes = {
  router: React.PropTypes.shape({
    history: React.PropTypes.object.isRequired,
  })
}

module.exports = Menu
