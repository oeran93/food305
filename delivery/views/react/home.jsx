const React     = require('react')
const PropTypes = require('prop-types')
const Menu = require('./menu.jsx')
const My_Meals = require('./my_meals.jsx')

class Home extends React.Component {

  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className="row home-page">
        <My_Meals />
        <Menu user={this.props.user} />
      </div>
    )
  }

}

Home.propTypes = {
  user: PropTypes.oneOfType([PropTypes.bool, PropTypes.object])
}

module.exports = Home
