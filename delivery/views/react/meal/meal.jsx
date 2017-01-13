const React        = require('react')
const _            = require('underscore')
const $            = require('jquery')
const Price        = require('./price.jsx')
const Actions      = require('./actions.jsx')
const date         = require('../../../../tools/date.js')
const price_people = require('../../../../tools/price_people.js')
const format       = require('../../../../tools/format.js')

module.exports = React.createClass({

  propTypes: {
    _id: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    prices: React.PropTypes.array.isRequired,
    people: React.PropTypes.array.isRequired,
    nOrders: React.PropTypes.number.isRequired,
    image: React.PropTypes.string.isRequired,
    action: React.PropTypes.string
  },

  getInitialState: function () {
    return {
      nOrders: this.props.nOrders
    }
  },

  getDefaultProps: function () {
    return {
      action: 'buy'
    }
  },

  add_meal: function () {
    $.ajax({
      method: 'POST',
      url: '/post_order',
      data: {meal: this.props._id, date: date.this_order_delivery().format('MMM DD YYYY, hh')},
      error: (data) => {
        this.setState((state) => {return {nOrders: state.nOrders - 1}})
        this.confirmation('failure')
      },
      success: () => this.confirmation('success')
    })
    this.setState((state) => {return {nOrders: state.nOrders + 1}})
  },

  confirmation: function (type) {
    $('.confirmation.'+type).slideToggle('fast')
    setTimeout(() => $('.confirmation.'+type).slideToggle('fast'),5000)
  },

  render: function () {
    let {action, image, name, people, prices, _id} = this.props
    let {nOrders} = this.state
    let people_to_next_deal = price_people.next_people(people,prices,nOrders) - nOrders
    return (
      <div name={_id} className='col-md-6 col-lg-4 meal'>
        <div className='thumbnail'>
          <img src={'images/meals/' + image} alt='Meal Picture' />
          <div className='caption clearfix'>
            <h4 title={name} className='food-name'>{format.dotdotdot(name,20)}</h4>
            <Price 
              people={people} 
              prices={prices}
              nOrders={nOrders}
            />
              <div className='more-info'>
                { people_to_next_deal > 0 
                  ?
                    <p><span className='badge'>{people_to_next_deal}</span> people to next deal</p>
                  :
                    <p>You are getting our best deal</p>
                }
              </div>
            {action && <Actions add_meal={this.add_meal} action={action} _id={_id} />}
          </div>
        </div>
      </div>
    )
  }

})
