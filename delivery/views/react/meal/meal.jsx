const React          = require('react')
const Buy_Button     = require('./buy_button.jsx')
const Sign_In_Button = require('../sign_in_button.jsx')
const format         = require('../../../../tools/format.js')

module.exports = React.createClass({

  propTypes: {
    _id: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    price: React.PropTypes.number.isRequired,
    image: React.PropTypes.string.isRequired,
    delivery: React.PropTypes.object,
    action: React.PropTypes.string
  },

  render: function () {
    let {action, image, name, price, delivery, _id} = this.props
    let action_component = null
    if (action === 'buy') {
      action_component = <Buy_Button _id={_id} />
    } else if (action === 'login') {
      action_component = <Sign_In_Button />
    }
    return (
      <div name={_id} className='col-sm-6 col-md-4 col-lg-3 meal'>
        <div className='thumbnail'>
          <img src={'images/meals/' + image} alt='Meal Picture' />
          <div className='caption clearfix'>
            <h4 title={name} className='meal-name'>
              {format.dotdotdot(name,20)}
            </h4>
            <div className='clearfix'>
              <div className='prices'>
                <span className='label-success price pull-right'>
                  {'$ '+price}
                </span>
              </div>
              {action_component}
            </div>
            {delivery && <span className='meal-delivery label'>Delivery: {delivery.format('dddd Do, h a')}</span>}
          </div>
        </div>
      </div>
    )
  }

})
