const React     = require('react')
const $         = require('jquery')
const Meal      = require('./meal.jsx')
const PropTypes = require('prop-types')
const date = require('../../../tools/date.js')()

class Menu extends React.Component {

  constructor (props) {
    super(props)
  }

  render () {
    let {meals,user} = this.props
    return (
      <div className="menu">
        <div className="row">
        {meals.map(meal => {
          return <Meal key={meal._id} meal={meal} user={user} />
        })}
        </div>
      </div>
    )
  }

}

Menu.propTypes = {
  meals: PropTypes.array.isRequired,
  user: PropTypes.oneOfType([PropTypes.bool, PropTypes.object])
}

module.exports = Menu
