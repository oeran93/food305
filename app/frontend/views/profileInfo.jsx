var React = require('react')

var ProfileInfo = React.createClass(
  {
    propsType: {
      name: React.PropTypes.string.isRequired,
      picture: React.PropTypes.string.isRequired
    },

    render: function () {
      return (
        <div id='profile-info'>
          <div className='row'>
            <div className='col-xs-offset-3 col-xs-6'>
              <img src={this.props.picture} className='img-circle'></img>
            </div>
          </div>
          <div className='row'>
            <div className='col-xs-offset-2 col-xs-8'>
              <p>
                {this.props.name}
              </p>
            </div>
          </div>
        </div>
      )
    }
  }
)

module.exports = ProfileInfo
