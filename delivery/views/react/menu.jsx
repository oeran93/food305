const React = require('react')

module.exports = React.createClass({

    propTypes: {
      logged: React.PropTypes.string,
      change_page: React.PropTypes.func.isRequired,
      current_page: React.PropTypes.string.isRequired
    },

    render: function () {
      return (
        <ul id='nav' className='nav nav-pills nav-stacked full-width'>
          <li role='presentation' className = {this.props.current_page == 'search' && 'active'}>
             <a onClick={() => this.props.change_page('search')}>
              <span className='glyphicon glyphicon-home'></span> Home
             </a>
           </li>
          {this.props.logged
           &&
           <li role='presentation' className = {this.props.current_page == 'myMeals' && 'active'}>
             <a onClick={() => this.props.change_page('myMeals')}>
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
