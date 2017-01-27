var React = require('react')

module.exports = React.createClass({

  propTypes: {
    user: React.PropTypes.object,
    current_page: React.PropTypes.string.isRequired,
    change_page: React.PropTypes.func.isRequired,
  },

  render: function() {
    let {user, current_page, change_page} = this.props
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid" id='navbar-container'>
          <div className="navbar-header">
            <a className="navbar-brand" href="/">Food 305</a>
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
            </button>
          </div>
          <div className="collapse navbar-collapse pull-right" id="navbar-collapse">
            <ul className="nav navbar-nav">
              <li onClick={() => change_page('search')} 
                      type="button" 
                      className="btn red-btn navbar-btn lateral-space">
                HOME
              </li>
              {user &&
                <li onClick={() => change_page('myMeals')} 
                        type="button" 
                        className="btn red-btn navbar-btn lateral-space">
                  MY MEALS
                </li>
              }
              {user &&
               <li onClick={() => window.location.href = '/logout'} 
                        type="button" 
                        className="btn red-btn navbar-btn lateral-space">
                  LOG OUT
                </li>
              }
              {!user &&
                <li onClick={() => window.location.href = '/auth/facebook'} 
                        type="button" 
                        className="btn red-btn navbar-btn lateral-space">
                  SIGN IN
                </li>
              }
            </ul>
          </div>
        </div>
      </nav>
    )
  }

})