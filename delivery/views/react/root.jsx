import React from 'react'
import $ from 'jquery'
import Home from './home.jsx'
import Nav_Bar from './nav_bar.jsx'
import Footer from './footer.jsx'
import Access from './access/access.jsx'
import About from './about.jsx'
import {BrowserRouter as Router, Route} from 'react-router-dom'

class Root extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      render: false,
      user: null
    }
  }

  componentWillMount () {
    $.ajax({
      method: 'GET',
      url: '/profile',
      success: data => {
        this.setState({
          user: data.user,
          render: true
        })
      }
    })
  }

  render () {
    let {render, user} = this.state
    if (!render) return null
    else {
      return (
        <Router>
          <div>
            <Nav_Bar user={user}/>
            <div className='container-fluid page-container'>
              <div className='row page-row'>
               <div className='col-xs-12 page'>
                  <Route exact path='/' component={
                      () => user ? <Home user={user} /> : <About/>
                    }
                  />
               </div>
              </div>
            </div>
            <Footer />
          </div>
        </Router>
      )
    }
  }

}
module.exports = Root
