const React = require('react')

module.exports = React.createClass({

  propTypes: {
    value: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
    React.PropTypes.array
    ]).isRequired,
    error: React.PropTypes.func.isRequired,
    message: React.PropTypes.string,
    style: React.PropTypes.object
  },

  getDefaultProps: function () {
    return {
      message: 'wrong input',
      style: {color: 'red'}
    }
  },

  render: function() {
    let {value, message, error, style} = this.props
    if (error(value)) {
      return (
        <p className='form-error' style={style}>{message}</p>   
      )
    }
    return null
  }

})