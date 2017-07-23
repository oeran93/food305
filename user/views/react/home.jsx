const React     = require('react')
const PropTypes = require('prop-types')
const Menu = require('./menu.jsx')
const Rating = require('./rating.jsx')
const Restaurant_Banner = require('./restaurant_banner.jsx')
const ajx = require('../../../tools/ajax.js')()

class Home extends React.Component {

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
    let {toggleModal} = this.props
    let {restaurant, meals} = this.state
    return (
      <div className="home-page">
        <Restaurant_Banner meals={meals} restaurant={restaurant}/>
        <Rating />
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
