var React = require('react')

var ShareLinks = React.createClass({

  componentDidMount: function () {
    if (window.FB) {
      window.FB.XFBML.parse();
    }
  },

  render: function() {
    return (
     <div className="fb-send" data-href="http://nicolapedretti.com"></div>
    )
  }

})

module.exports = ShareLinks