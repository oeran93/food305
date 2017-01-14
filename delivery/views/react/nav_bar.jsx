var React = require('react')

var Nav_Bar = React.createClass({

  propTypes: {
    name: React.PropTypes.string,
    picture: React.PropTypes.string,
    current_page: React.PropTypes.string.isRequired,
    change_page: React.PropTypes.func.isRequired,
  },

  render: function() {
    let {name, picture, current_page, change_page} = this.props
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="/">Food 305</a>
          </div>
          <div className="collapse navbar-collapse pull-right">
            <ul className="nav navbar-nav">
              <button onClick={() => change_page('search')} 
                      type="button" 
                      className="btn default-btn navbar-btn lateral-space">
                HOME
              </button>
              {name &&
                <button onClick={() => change_page('myMeals')} 
                        type="button" 
                        className="btn default-btn navbar-btn lateral-space">
                  MY MEALS
                </button>
              }
              {name &&
               <button onClick={() => window.location.href = '/logout'} 
                        type="button" 
                        className="btn default-btn navbar-btn lateral-space">
                  LOG OUT
                </button>
              }
              {!name &&
                <button onClick={() => window.location.href = '/auth/facebook'} 
                        type="button" 
                        className="btn default-btn navbar-btn lateral-space">
                  SIGN IN
                </button>
              }
            </ul>
          </div>
        </div>
      </nav>
    )
  }

})

module.exports = Nav_Bar