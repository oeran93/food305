const React     = require('react')
const globals   = require('../../../tools/globals.js')
const PropTypes = require('prop-types')

class Nav_Bar extends React.Component {

  constructor (props) {
    super(props)
  }

  render () {
    let {user, current_page, change_page} = this.props
    return (
      <div className="navigation-bar">
        <div className="pull-left">
            <a className="text-uppercase" href="/">{globals.app_name}</a>
        </div>
        <div className="pull-right">
          <ul>
            <li onClick={() => change_page('search')}
                className="btn red-btn lateral-space"> HOME
            </li>
            {user &&
              <li onClick={() => change_page('myMeals')}
                  className="btn red-btn lateral-space"> MY MEALS
              </li>
            }
            {user &&
             <li onClick={() => window.location.href = '/logout'}
                 className="btn red-btn lateral-space"> LOG OUT
              </li>
            }
            {!user &&
              <li onClick={() => change_page('current_page', 'access')}
                  className="btn red-btn lateral-space"> SIGN IN
              </li>
            }
          </ul>
        </div>
      </div>
    )
  }

}

Nav_Bar.propTypes = {
  user: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  current_page: PropTypes.string.isRequired,
  change_page: PropTypes.func.isRequired,
}

module.exports = Nav_Bar
