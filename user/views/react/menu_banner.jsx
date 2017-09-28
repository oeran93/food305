const React = require('react')
const PropTypes = require('prop-types')
const generics = require('../../../tools/generics.js')
const date = require('../../../tools/date.js')()

class Menu_Banner extends React.Component {

    render () {
      let {restaurant} = this.props
      return (
        <div className="container-fluid menu-banner banner">
          <div className="row">
            <div className="col-xs-12">
              <h1 className="title text-uppercase text-center">{restaurant.name}</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <h3 className="text-center">Order before 11:00 am to get your food {date.get_day_of_week(date.this_order_delivery())}</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 text-center">
              <button className="btn red-btn" onClick={() => generics.scrollTo("#menu")} >Explore our curated menu</button>
            </div>
          </div>
        </div>
      )
    }
}

Menu_Banner.propTypes = {
  restaurant: PropTypes.object.isRequired
}

module.exports = Menu_Banner
