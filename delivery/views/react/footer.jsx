var React = require('react')

module.exports = React.createClass({

  render: function() {
    return (
      <footer>
        <div className="container">
          <div className='row'>
            <div className='col-xs-3 col-xs-offset-9'>
              <a href=''><span className="fa fa-facebook-square fa-2x" aria-hidden="true"></span></a>
              <a href=''><span className="fa fa-linkedin-square fa-2x" aria-hidden="true"></span></a>
              <a href=''><span className="fa fa-google-plus-square fa-2x" aria-hidden="true"></span></a>
            </div>
          </div>
        </div>
      </footer>
    )
  }

})