const React         = require('react')
const $             = require('jquery')
const Search_Page   = require('./search_page.jsx')
const My_Meals_Page = require('./my_meals_page.jsx')
const Banner        = require('./banner.jsx')
const cookies       = require('../../../tools/cookies.js')
const Nav_Bar       = require('./nav_bar.jsx')
const Footer        = require('./footer.jsx')

module.exports = React.createClass({

  getInitialState: function () {
    return {
      render: false,
      name: null,
      picture: null,
      page: 'search',
    }
  },

  componentWillMount: function () {
    $.ajax({
      method: 'GET',
      url: '/get_user_basics',
      success: (data) => {
        this.setState({
          render: true,
          name: data.name,
          picture: data.picture
        })
      }
    })
  },

  change_page: function (pg) {
  	this.setState({page: pg})
  },

  router: function () {
    switch(this.state.page) {
      case 'search':
        return <Search_Page logged={this.state.name}/>
      case 'myMeals':
        return <My_Meals_Page logged={this.state.name}/>
      default:
        return <Search_Page logged={this.state.name}/> 
    }
  },

  render: function () {
    let {render, name, picture, page} = this.state
    if (!name && !cookies.get_cookie('new_user')) {
      window.location.href = '/welcome.html'
      return null
    }
    return (
      <div>
        <Nav_Bar 
         name={name} 
         picture={picture}
         change_page={this.change_page}
         current_page={page}
        />
        <Banner />
        <div className='container'>
          <div className='row'>
           <div id="page" className='col-xs-12'>
           	<div className='container-fluid'>
           	  {this.router()}
           	 </div>
           </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

})
