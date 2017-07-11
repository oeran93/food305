import React from 'react'
import PropTypes from 'prop-types'
const $ = require('jquery')
const _ = require('underscore')
const confirmation  = require('../../../tools/confirmation.js')()

class Rating extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      order: {}
    }
  }

  componentWillMount () {
    $.get('/get_latest_user_order', (order) => {
      this.setState({order})
    })
  }

  send_rating (e) {
    let {order} = this.state
    $.post('/rate_order', {order: order._id, rating: e.target.getAttribute('value')}, (res) => {
      if (res.error) confirmation.failure(res.error.message)
      else {
        confirmation.success('Thank you!')
        this.setState({order: {}})
      }
    })
  }

  render () {
    let {order} = this.state
    if (_.size(order) == 0) return null
    let {image, name} = order._meal
    return (
      <div className="container-fluid rating-container">
      {!order.rating
        &&
          <div className="row">
            <div className="col-xs-12">
              <h3 className="text-center">Review your last meal</h3>
              <div className="row">
                <div className='col-xs-12 col-md-offset-3 col-md-2 meal'>
                  <div className='thumbnail clearfix'>
                    <img src={'images/meals/' + image} alt={name}/>
                  </div>
                </div>
                <div className="col-xs-12 col-md-6">
                  <h4 title={name} className='meal-name'>{name}</h4>
        					<i className="star fa fa-star fa-4x" aria-hidden="true" value="1" onClick={this.send_rating.bind(this)}></i>
                  <i className="star fa fa-star fa-4x" aria-hidden="true" value="2" onClick={this.send_rating.bind(this)}></i>
                  <i className="star fa fa-star fa-4x" aria-hidden="true" value="3" onClick={this.send_rating.bind(this)}></i>
                  <i className="star fa fa-star fa-4x" aria-hidden="true" value="4" onClick={this.send_rating.bind(this)}></i>
                  <i className="star fa fa-star fa-4x" aria-hidden="true" value="5" onClick={this.send_rating.bind(this)}></i>
                </div>
              </div>
            </div>
          </div>
      }
      </div>
    )
  }

}

module.exports = Rating
