const React     = require('react')
const PropTypes = require('prop-types')
const Menu = require('./menu.jsx')
const Rating = require('./rating.jsx')
const Restaurant_Banner = require('./restaurant_banner.jsx')
const date  = require('../../../tools/date.js')()

class Home extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      restaurant: {},
      meals: []
    }
  }

  componentWillMount () {
    let closest_delivery = date.this_delivery().format('MM-DD-YYYY hh:mm a')
    let station = this.props.user.station
    let this_order_delivery = date.this_order_delivery().day()
    $.get(
      '/get_menu',
          {
            station,
            date: closest_delivery,
            delivery_day: this_order_delivery
          },
      menu => this.setState({restaurant: menu.restaurant, meals: menu.meals})
    )
  }

  render () {
    let {toggleModal} = this.props
    let {restaurant, meals} = this.state
    return (
      <div className="home-page">
        <Rating />
        <Restaurant_Banner meals={meals} restaurant={restaurant}/>
        <div className="container">
          <Menu toggleModal={toggleModal} meals={meals}/>
        </div>
      </div>
    )
  }

}

Home.propTypes = {
  user: PropTypes.oneOfType([PropTypes.bool, PropTypes.object])
}

module.exports = Home
