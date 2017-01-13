const React        = require('react')
const _            = require('underscore')
const $            = require('jquery')
const Actions      = require('./actions.jsx')
const date         = require('../../../../tools/date.js')
const price_people = require('../../../../tools/price_people.js')
const format       = require('../../../../tools/format.js')

module.exports = React.createClass({

  propTypes: {
    _id: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    price: React.PropTypes.number.isRequired,
    image: React.PropTypes.string.isRequired,
    action: React.PropTypes.string
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
      error: (data) => this.confirmation('failure'),
      success: () => this.confirmation('success')
    })
  },

  confirmation: function (type) {
    $('.confirmation.'+type).slideToggle('fast')
    setTimeout(() => $('.confirmation.'+type).slideToggle('fast'),5000)
  },

  render: function () {
    let {action, image, name, price, _id} = this.props
    return (
      <div name={_id} className='col-md-6 col-lg-4 meal'>
        <div className='thumbnail'>
          <img src={'images/meals/' + image} alt='Meal Picture' />
          <div className='caption clearfix'>
            <h4 title={name} className='food-name'>
              {format.dotdotdot(name,20)}
            </h4>
            <div className='prices'>
              <span className='label-success price pull-right'>
                {'$ '+price}
              </span>
            </div>
            {action && <Actions add_meal={this.add_meal} action={action} _id={_id} />}
          </div>
        </div>
      </div>
    )
  }

})
