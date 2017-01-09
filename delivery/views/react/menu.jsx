var React = require('react')

var Menu = React.createClass({

    propTypes: {
      logged: React.PropTypes.string,
      changePage: React.PropTypes.func.isRequired,
      currentPage: React.PropTypes.string.isRequired
    },

    render: function () {
      return (
        <ul id='nav' className='nav nav-pills nav-stacked full-width'>
          <li role='presentation' className = {this.props.currentPage == 'search' && 'active'}>
             <a onClick={() => this.props.changePage('search')}>
              <span className='glyphicon glyphicon-home'></span> Home
             </a>
           </li>
          {this.props.logged
           &&
           <li role='presentation' className = {this.props.currentPage == 'myMeals' && 'active'}>
             <a onClick={() => this.props.changePage('myMeals')}>
             	<span className='glyphicon glyphicon-shopping-cart'></span> My Meals
             </a>
           </li>
          }
          {this.props.logged
           &&
           <li role='presentation'>
             <a href='/logout'>
             	<span className='glyphicon glyphicon-log-out'></span> Log Out
             </a>
           </li>
        	}
          {!this.props.logged
            &&
            <li role='presentation'>
              <a href='/auth/facebook'>
              	<span className='glyphicon glyphicon-log-in'></span> Sign up/in with Facebook
              </a>
            </li>
          }
        </ul>
      )
    }

})

module.exports = Menu
