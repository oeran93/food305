const React     = require('react')
const PropTypes = require('prop-types')
const Menu = require('./menu.jsx')
const My_Meals = require('./my_meals.jsx')
const date  = require('../../../tools/date.js')()

class Home extends React.Component {

  constructor (props) {
    super(props)
  }

  render () {
    let {user, toggleModal} = this.props
    return (
      <div className="home-page">
        <div className="container-fluid">
          <div className="row restaurant-banner banner">
            <div className="clearfix">
              <div className="col-xs-12">
                <h1 className="title text-uppercase text-center">Corner 17</h1>
              </div>
              <div className="col-xs-12">
                <h3 className="subtitle text-center">
                  Explore the Asian cuisine
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <My_Meals />
          <Menu user={user} toggleModal={toggleModal}/>
        </div>
      </div>
    )
  }

}

module.exports = Home
