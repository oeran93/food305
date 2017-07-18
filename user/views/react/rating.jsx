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

  uncolor_stars () {
    $('.star').css('color','inherit')
  }

  color_stars (e) {
    for (let i = 0; i < parseInt(e.target.getAttribute('value')); i++ ) {
      $('.star-'+i).css('color', '#ff9933')
    }
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
    let {name, _restaurant} = order._meal
    return (
      <div className="container-fluid">
      {!order.rating
        &&
          <div className="row rating-container">
            <div className="col-xs-12">
              <h2 className="title text-center">How was your last meal at {_restaurant.name} ? </h2>
              <div className="row text-center" onMouseOut={this.uncolor_stars}>
                <div className="col-xs-12 col-md-12">
                  <h3 title={name} className='meal-name'>{name}</h3>
        					<i className="star star-0 fa fa-star fa-3x" aria-hidden="true" value="1" onMouseOver={this.color_stars} onClick={this.send_rating.bind(this)}></i>
                  <i className="star star-1 fa fa-star fa-3x" aria-hidden="true" value="2" onMouseOver={this.color_stars} onClick={this.send_rating.bind(this)}></i>
                  <i className="star star-2 fa fa-star fa-3x" aria-hidden="true" value="3" onMouseOver={this.color_stars} onClick={this.send_rating.bind(this)}></i>
                  <i className="star star-3 fa fa-star fa-3x" aria-hidden="true" value="4" onMouseOver={this.color_stars} onClick={this.send_rating.bind(this)}></i>
                  <i className="star star-4 fa fa-star fa-3x" aria-hidden="true" value="5" onMouseOver={this.color_stars} onClick={this.send_rating.bind(this)}></i>
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
