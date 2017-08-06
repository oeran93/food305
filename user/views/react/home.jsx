const React             = require('react')
const PropTypes         = require('prop-types')
const Menu              = require('./menu.jsx')
const Rating            = require('./rating.jsx')
const Restaurant_Banner = require('./restaurant_banner.jsx')
const ajx               = require('../../../tools/ajax.js')()
const globals           = require('../../../tools/globals.js')
const _                 = require('underscore')

class Home extends React.Component {

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
    let {user} = this.props
    let {restaurant, meals} = this.state
    return (
      <div className="home-page">
        <Restaurant_Banner meals={meals} restaurant={restaurant}/>
        <Rating />
        <div className="container">
          <Menu user={user} meals={meals}/>
        </div>
      </div>
    )
  }

}

Home.propTypes = {
  user: PropTypes.oneOfType([PropTypes.bool, PropTypes.object])
}

Home.contextTypes = {
  router: React.PropTypes.shape({
    history: React.PropTypes.object.isRequired,
  })
}

module.exports = Home
