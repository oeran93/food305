var React = require('react')
var $ = require('jquery')
var ProfileInfo = require('./profileInfo.jsx')
var Menu = require('./menu.jsx')
var SearchPage = require('./searchPage.jsx')
var MyMealsPage = require('./myMealsPage.jsx')
var cookies = require('../../tools/cookies.js')
var date = require('../../tools/date.js')
var Root = React.createClass({

  getInitialState: function () {
    return {
      render: false,
      name: null,
      picture: null,
      page: 'search',
      hours: 0,
      minutes: 0,
      seconds: 0
    }
  },

  componentWillMount: function () {
    $.ajax({
      method: 'GET',
      url: '/getInitialData',
      success: (data) => {
        this.setState({
          render: true,
          name: data.name,
          picture: data.picture
        })
      }
    })
    setInterval(this.endOfThisOrder,1000)
  },

  endOfThisOrder: function () {
    var time = date.timeUntilOrderClosed()
    this.setState({
      hours: Math.trunc(time.asHours()),
      minutes: Math.trunc(time.asMinutes()%60),
      seconds: Math.trunc(time.asSeconds()%60)
    })
  },

  changePage: function (pg) {
  	this.setState({page: pg})
  },

  router: function () {
  	switch(this.state.page) {
  		case 'search':
  			return <SearchPage logged={this.state.name}/>
  			break
  		case 'myMeals':
  			return <MyMealsPage logged={this.state.name}/>
  			break
  		default:
  			return <SearchPage logged={this.state.name}/> 
  	}
  },

  render: function () {
    var {hours,minutes,seconds} = this.state
    var day = hours > 12 ? 'Tomorrow' : 'Today'
    if (this.state.render && !this.state.name && !cookies.getCookie('newUser')) {
      window.location.href = '/welcome.html'
      return
    }
    return (
      <div>
        <div id='banner'>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="countdown">
                  <h1>Buy now for {day}'s lunch!</h1>
                  <h5>Sale ends in</h5>
                  <div id="clockdiv">
                    <div>
                      <span className="hours">{hours}</span>
                      <div className="smalltext">Hours</div>
                    </div>
                    <div>
                      <span className="minutes">{minutes}</span>
                      <div className="smalltext">Minutes</div>
                    </div>
                    <div>
                      <span className="seconds">{seconds}</span>
                      <div className="smalltext">Seconds</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='container'>
          {this.state.render
             ?
             <div className='row'>
               <div id='menu-bar' className='col-md-3'>
                 <div id='menu'>
                   {this.state.name
                    	&&
  	                    <ProfileInfo 
  	                    	name={this.state.name} 
  	                    	picture={this.state.picture}
  	                    />
                  	}
                  	<Menu 
                  		logged={this.state.name}
                  		changePage={this.changePage}
                      currentPage={this.state.page}
                  	/>
                 </div>
               </div>
               <div id="page" className='col-md-9'>
               	<div className='container-fluid'>
               	  {this.router()}
               	 </div>
               </div>
             </div>
             :
             <div>
               Spinning
             </div>
          }
        </div>
      </div>
    )
  }

})

module.exports = Root
