const React     = require('react')
const PropTypes = require('prop-types')

class Slider extends React.Component {

  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className='slider' id={this.props.name}>
        {this.props.children}
      </div>
    )
  }

}

Slider.propTypes = {
  name: PropTypes.string
}

module.exports = Slider
