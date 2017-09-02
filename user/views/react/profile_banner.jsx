const React = require('react')
const PropTypes = require('prop-types')

class Profile_Banner extends React.Component {

    constructor (props) {
      super(props)
    }

    render () {
      let user = window.store.get('user')
      return (
        <div className="container-fluid profile-banner banner">
          <div className="row">
            <div className="col-xs-12">
              <h1 className="title text-uppercase text-center">{user.name}</h1>
            </div>
            <div className="col-xs-12 text-center text-uppercase">
              <h3 className="subtitle">What we know about you</h3>
            </div>
          </div>
        </div>
      )
    }
}

module.exports = Profile_Banner
