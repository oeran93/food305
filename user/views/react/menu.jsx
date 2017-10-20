const React       = require('react')
const PropTypes   = require('prop-types')
const Rating      = require('./rating.jsx')
const Menu_Banner = require('./menu_banner.jsx')
import Meal from './meal.jsx'
import Info_Bar from './info_bar.jsx'
const ajx         = require('../../../tools/ajax.js')()
const globals     = require('../../../tools/globals.js')
const _ = require('underscore')

class Menu extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      restaurant: {},
      meals: []
    }
  }

  componentWillMount () {
    ajx.call({
        method: "GET",
        url: "/get_menu",
        success: (menu) => this.setState({restaurant: menu.restaurant, meals: menu.meals}),
        show_loading: true
    })
  }

  render () {
    let {restaurant, meals} = this.state
    return (
      <div>
        <Menu_Banner restaurant={restaurant} />
        <Info_Bar meals={meals} restaurant={restaurant} />
        <Rating />
        <div id="menu" className="container menu">
          {_.range(meals.length+1).filter(num => num % 3 == 0 && num != 0).map(num => {
            return (
              <div key={num} className="row">
                {meals.slice(num-3,num).map((meal,i) => <Meal index={i} key={meal._id} meal={meal}/>)}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

}

module.exports = Menu
