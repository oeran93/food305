const React     = require('react')
const $         = require('jquery')
const Meal      = require('./meal.jsx')
const PropTypes = require('prop-types')

class Menu extends React.Component {

  constructor (props) {
    super(props)
  }

  render () {
    let {meals,toggleModal} = this.props
    return (
      <div className="menu">
        <div className="row">
        {meals.map(meal => {
          return <Meal key={meal._id} meal={meal} toggleModal={toggleModal} />
        })}
        </div>
      </div>
    )
  }

}

Menu.propTypes = {
  meals: PropTypes.array.isRequired,
  toggleModal: PropTypes.func.isRequired
}

module.exports = Menu
