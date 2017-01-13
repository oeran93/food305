const React         = require('react')
const $             = require('jquery')
const Profile_Info  = require('./profile_info.jsx')
const Menu          = require('./menu.jsx')
const Search_Page   = require('./search_page.jsx')
const My_Meals_Page = require('./my_meals_page.jsx')
const Banner        = require('./banner.jsx')
const cookies       = require('../../../tools/cookies.js')

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
    if (!this.state.render) return null
    if (!this.state.name && !cookies.get_cookie('new_user')) {
      window.location.href = '/welcome.html'
      return null
    }
    return (
      <div>
        <Banner />
        <div className='container'>
          <div className='row'>
           <div id='menu-bar' className='col-sm-5 col-md-3'>
             <div id='menu'>
             {this.state.name
                &&
                  <Profile_Info 
                    name={this.state.name} 
                    picture={this.state.picture}
                />
            	}
              <Menu 
                logged={this.state.name}
                change_page={this.change_page}
                current_page={this.state.page}
              />
             </div>
           </div>
           <div id="page" className='col-sm-7 col-md-9'>
           	<div className='container-fluid'>
           	  {this.router()}
           	 </div>
           </div>
          </div>
        </div>
      </div>
    )
  }

})
