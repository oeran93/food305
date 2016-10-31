var React = require('react')
var _ = require('underscore')
var $ = require('jquery')
var Basic = require('./basic.jsx')
var MoreInfo = require('./moreInfo.jsx')
var Actions = require('./actions.jsx')

var Meal = React.createClass({

  propTypes: {
    _id: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    prices: React.PropTypes.array.isRequired,
    people: React.PropTypes.array.isRequired,
    orders: React.PropTypes.number.isRequired,
    image: React.PropTypes.string.isRequired,
    action: React.PropTypes.string
  },

  getInitialState: function () {
    return {
      orders: this.props.orders
    }
  },

  getDefaultProps: function () {
    return {
      action: 'buy'
    }
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

  addMeal: function () {
    $.ajax({
      method: 'POST',
      url: '/postMeal',
      data: {meal: this.props._id},
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
    var {action, image, name} = this.props
    return (
      <div className='col-md-6 col-lg-4 meal'>
        <div className='thumbnail'>
          <img src={'images/meals/' + image} alt='Meal Picture' />
          <div className='caption clearfix'>
            <Basic 
              currentPrice={currentPrice} 
              defaultPrice={defaultPrice}
              name={name}
            />
            <hr/>
            <MoreInfo 
              nextPricePeople={nextPricePeople} 
              bestPricePeople={bestPricePeople}
              currentPrice={currentPrice}
              orders={this.state.orders}
            />
            {action && <Actions addMeal={this.addMeal} action={action}/>}
          </div>
        </div>
      </div>
    )
  }

})

module.exports = Meal
