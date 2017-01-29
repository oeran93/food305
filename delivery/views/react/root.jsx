const React         = require('react')
const $             = require('jquery')
const Search_Page   = require('./search_page.jsx')
const My_Meals_Page = require('./my_meals_page.jsx')
const Banner        = require('./banner.jsx')
const cookies       = require('../../../tools/cookies.js')
const Nav_Bar       = require('./nav_bar.jsx')
const Footer        = require('./footer.jsx')
const Sign_Up       = require('./sign_up.jsx')
const Welcome_Page  = require('./welcome_page.jsx')

module.exports = React.createClass({

  getInitialState: function () {
    return {
      render: false,
      user: null,
      page: 'search',
    }
  },

  componentWillMount: function () {
    $.ajax({
      method: 'GET',
      url: '/get_user_basics',
      success: (user) => {
        this.setState({
          user,
          render: true
        })
      }
    })
  },

  change_page: function (pg) {
  	this.setState({page: pg})
  },

  router: function () {
    let {user} = this.state
    switch(this.state.page) {
      case 'search':
        return <Search_Page user={user}/>
      case 'myMeals':
        return <My_Meals_Page user={user}/>
      default:
        return <Search_Page user={user}/> 
    }
  },

  render: function () {
    let {render, user, page} = this.state
    if (!render) return null
    else if (!user && !cookies.get_cookie('new_user')) {
      return <Welcome_Page />
    } 
    else if (user && !user.email) {
      return <Sign_Up />
    }
    else {
      return (
        <div>
          <Nav_Bar
           user={user}
           change_page={this.change_page}
           current_page={page}
          />
          <Banner />
          <div className='container page-container'>
            <div className='row page-row'>
             <div className='col-xs-12 page'>
                {this.router()}
             </div>
            </div>
          </div>
          <Footer />
        </div>
      )
    }
  }

})
