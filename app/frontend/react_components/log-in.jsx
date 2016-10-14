var React = require('react')
var ReactDom = require('react-dom')

var LogIn = React.createClass({

	render: function() {
		return <div>Hello</div>
	}

});

ReactDom.render(<LogIn/>,document.getElementById('login-box'))