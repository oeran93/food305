const React = require('react')
const Access  = require('./access/access.jsx')

module.exports = React.createClass({

  getInitialState: function () {
    return {
      show_access: false
    }
  },

  close: function () {
    this.setState({show_access: false})
  },

  render: function() {
    let {show_access} = this.state
    return (
      <div>
        <span className='pull-right'>
          <a 
            className='btn red-btn'
            role='button' 
            onClick={() => this.setState({show_access: true})}>
            Sign in to buy
          </a>
        </span>
        {show_access && <Access close={this.close}/>}
      </div>
    )
  }

})