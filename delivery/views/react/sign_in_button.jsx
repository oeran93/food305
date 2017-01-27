const React = require('react')

module.exports = React.createClass({

  render: function() {
    return (
      <div>
        <span className='pull-left'>
          <a 
            className='btn red-btn'
            role='button' 
            onClick={() => window.location.href = '/auth/facebook'}>
            Sign in to buy
          </a>
        </span>
      </div>
    )
  }

})