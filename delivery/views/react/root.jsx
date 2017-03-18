const React         = require('react')
const $             = require('jquery')
const Search_Page   = require('./search_page.jsx')
const My_Meals_Page = require('./my_meals_page.jsx')
const Banner        = require('./banner.jsx')
const cookies       = require('../../../tools/cookies.js')
const Nav_Bar       = require('./nav_bar.jsx')
const Footer        = require('./footer.jsx')
const Access        = require('./access/access.jsx')

module.exports = React.createClass({

  getInitialState: function () {
    return {
      render: false,
      user: null,
      page: 'search',
      access: false
    }
  },

  componentWillMount: function () {
    $.ajax({
      method: 'GET',
      url: '/profile',
      success: (data) => {
        this.setState({
          user: data.user,
          render: true
        })
      }
    })
  },

  change_page: function (pg, access) {
  	this.setState({page: pg})
    if (access) this.setState({access: true})
  },

  close_access: function () {
    this.setState({access: false})
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
    let {render, user, page, access} = this.state
    if (!render) return null
    else {
      return (
        <div>
          {access && <Access close={this.close_access}/>}
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
