var React     = require('react')
const cookies = require('../../../tools/cookies.js')

module.exports = React.createClass({

  getInitialState: function () {
    return {
      section: 1
    }
  },

  start: function () {
    cookies.set_cookie("new_user", "no", 30)
    window.location.href = '/'
  },

  render: function() {
    let {section} = this.state
    let content = null
    if (section === 1) {
      content = (
        <div>
          <h1 className='red-text'> Food 305 </h1>
          <h2 className='red-text big-bottom-space'>
            Get your food delivered <b> FOR FREE </b> 
          </h2>
          <button type="button" className="btn btn-default" onClick={() => this.setState({section: 2})}>
              Next
          </button>
        </div>
      )
    } else if (section === 2) {
      content = (
        <div>
          <h1 className='red-text'> Where </h1>
          <h2 className='red-text big-bottom-space'>
            Washington University in St Louis. Lopata Gallery 
          </h2>
          <button type="button" className="btn btn-default" onClick={() => this.setState({section: 3})}>
              Next
          </button>
        </div>
      )
    } else if (section === 3) {
      content = (
        <div>
          <h1 className='red-text'> When </h1>
          <h2 className='red-text big-bottom-space'>
            Every Saturday and Sunday at 2:00 pm 
          </h2>
          <button type="button" className="btn btn-default" onClick={this.start}>
              Start
          </button>
        </div>
      )
    }
    return (
      <div className='container'>
        <div className='info-box'>
          {content}
        </div>
      </div>
    )
  }

})