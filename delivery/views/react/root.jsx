const React         = require('react')
const $             = require('jquery')
const Search_Page   = require('./search_page.jsx')
const My_Meals_Page = require('./my_meals_page.jsx')
const Slider        = require('./slider.jsx')
const Nav_Bar       = require('./nav_bar.jsx')
const Footer        = require('./footer.jsx')
const Access        = require('./access/access.jsx')
const date          = require('../../../tools/date.js')().this_order_delivery()

class Root extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      render: false,
      user: null,
      page: 'search',
      access: false
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

  change_page (pg, access) {
  	this.setState({page: pg})
    if (access) this.setState({access: true})
  }

  close_access () {
    this.setState({access: false})
  }

  router () {
    let {user} = this.state
    switch(this.state.page) {
      case 'search':
        return <Search_Page user={user}/>
      case 'myMeals':
        return <My_Meals_Page user={user}/>
      default:
        return <Search_Page user={user}/>
    }
  }

  render () {
    let {render, user, page, access} = this.state
    if (!render) return null
    else {
      return (
        <div>
          {access && <Access close={this.close_access.bind(this)}/>}
          <Slider name="root_slider">
            <Nav_Bar
             user={user}
             change_page={this.change_page.bind(this)}
             current_page={page}
            />
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12">
                  <div className="countdown">
                    <h1 className='adv free-delivery text-uppercase'>Free Delivery</h1>
                    <h2 className='adv buy-now-for text-uppercase'>Buy now for {date.format('dddd')}'s lunch</h2>
                  </div>
                </div>
              </div>
            </div>
          </Slider>
          <div className='container page-container'>
            <div className='row page-row'>
             <div className='col-xs-12 page'>
                {this.router()}
             </div>
            </div>
          </div>
          <Footer />
        </div>
      )
    }
  }

}
module.exports = Root
