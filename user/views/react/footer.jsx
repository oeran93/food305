var React = require('react')

module.exports = function (props) {
  return (<footer>
    <div className="container">
      <div className='row'>
        <div className='col-xs-4'>
          <h4><a href="mailto:info@vimifood.com">Contact Us</a></h4>
        </div>
        <div className='col-xs-4'>
          <h4><a href="/terms_and_conditions.pdf">Terms and Conditions</a></h4>
        </div>
        <div className='col-xs-4'>
          <h4><a href="#">About Us</a></h4>
        </div>
      </div>
    </div>
  </footer>)
}
