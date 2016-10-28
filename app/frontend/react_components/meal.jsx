var React = require('react')
var _ = require('underscore')
var $ = require('jquery')

var Meal = React.createClass({
  getInitialState: function () {
    return {
      orders: this.props.orders
    }
  },

  propTypes: {
    _id: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    prices: React.PropTypes.array.isRequired,
    people: React.PropTypes.array.isRequired,
    orders: React.PropTypes.number.isRequired,
    image: React.PropTypes.string.isRequired
  },

  getDefaultPrice: function () {
    return this.props.prices[0]
  },

  getCurrentPrice: function () {
    var people = this.props.people
    for (var i = 0; i < _.size(people); i++) {
      if (people[i] > this.state.orders) {
        return this.props.prices[--i]
      }
    }
    return _.min(this.props.prices)
  },

  getNextPricePeople: function () {
    var people = this.props.people
    var prices = this.props.prices
    for (var i = 0; i < _.size(people); i++) {
      if (people[i] > this.state.orders) {
        return {people: people[i],price: prices[i]}
      }
    }
    return this.getBestPricePeople()
  },

  getBestPricePeople: function () {
    var people = this.props.people
    var prices = this.props.prices
    return {people: _.max(people), price: _.min(prices)}
  },

  addOrder: function () {
    var query = {meal: this.props._id}
    $.ajax({
      method: 'POST',
      url: '/postOrder',
      data: query,
      error: (data) => {
        this.setState({orders: this.state.orders - 1})
        alert('something went wrong, we could not process your order')
      }
    })
    this.setState({orders: this.state.orders + 1})
  },

  render: function () {
    var defaultPrice = this.getDefaultPrice()
    var currentPrice = this.getCurrentPrice()
    var bestPricePeople = this.getBestPricePeople()
    var nextPricePeople = this.getNextPricePeople()
    return (
      <div className='col-md-6 col-lg-4 meal'>
        <div className='thumbnail'>
          <img src={'images/meals/' + this.props.image} alt='Meal Picture' />
          <div className='caption clearfix'>
            <h3 className='food-name'>{this.props.name}</h3>
            <h4>Price {defaultPrice != currentPrice
                       &&
                       <span className='lateral-space'><strike>{'$' + defaultPrice}</strike></span>} <span className='label-success current-price pull-right'>{'$' + currentPrice}</span></h4>
            <hr/>
            {currentPrice == bestPricePeople.price
               ?
               <p>
                 You are getting our best deal!
                 <br/>
                 <span className='badge'>{this.state.orders}</span> people bought it
               </p>
             
               :
               <p>
                 If
                 {" "}
                 {nextPricePeople.people - this.state.orders} more people buy it, you will pay $
                 {nextPricePeople.price}
                 <br/> Best deal:
                 {" "}
                 {bestPricePeople.people} people,
                 {" "}
                 {'$' + bestPricePeople.price}
                 <br/>
                 <span className='badge'>{this.state.orders}</span> people bought it
               </p>}
            <p className='pull-right'>
              <a className='btn btn-primary btn-outline' role='button' onClick={this.addOrder}>Order</a>
            </p>
          </div>
        </div>
      </div>
    )
  }

})

module.exports = Meal
