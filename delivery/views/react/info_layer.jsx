const React = require('react')

module.exports = React.createClass({

  propTypes: {
    title:React.PropTypes.string.isRequired,
    body:React.PropTypes.string.isRequired,
    action:React.PropTypes.func,
    action_name:React.PropTypes.string
  },

  render: function() {
    let {title, body, action, action_name, children} = this.props
    return (
      <div className="black-layer" >
        <div className="white-layer">
          <div className='info-box'>
            <h1 className='red-text'> {title} </h1>
            <h2 className='red-text big-bottom-space'>
              {body}
            </h2>
            {children}
            {action && <button type="button" className="btn red-btn" onClick={action}>
                {action_name}
            </button>}
          </div>
        </div>
      </div>
    )
  }

})