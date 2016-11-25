var React = require('react')
var _ = require('underscore')
var ProfileInfo = require('./profileInfo.jsx')
var Menu = require('./menu.jsx')
var SearchPage = require('./searchPage.jsx')
var MyMealsPage = require('./myMealsPage.jsx')

var Router = React.createClass({

	propTypes: {
		page: React.PropTypes.string
		user: React.PropTypes.object.isRequired
	},

	getDefaultProps: function () {
		return {
			page: 'newUser'
		}
	},

	getInitialState: function () {
		return {
			page: this.props.page
			user: this.props.user
		}
	},

	redirect: function (page) {
		this.setState({page: page})
	}

	render: function() {
		var {page, user} = this.state
		var  logged = !_.isEmpty(user)
		if (page === 'newUser' && !logged) {
			return <NewUser redirect={this.redirect}/>
		} else {
			page = 'searchPage'
		}
		var content = logged ? <ProfileInfo /> : ''
		content += <Menu redirect={this.redirect} logged={logged} currentPage={page}/>
		switch (page) {
			case 'searchPage':
				content += <SearchPage logged={logged} />
				break
			case 'myMealsPage':
				content += <MyMealsPage/>
				break
			default:
				content += <div>Wrong Routing</div>
		}
	}

})

module.exports = Router