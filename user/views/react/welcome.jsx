import React from 'react'
import Link from 'react-router-dom'
import globals from '../../../tools/globals.js'
import Access from './access/access.jsx'
import generics from '../../../tools/generics.js'
import About from './about.jsx'
const date = require('./../../../tools/date')()
const ajx = require('../../../tools/ajax.js')()

class Welcome extends React.Component {
  
  constructor (props) {
    super(props)
    this.state = {
      restaurant: {},
      meals: []
    }
  }

  componentWillMount () {
    ajx.call({
        method: "GET",
        url: "/get_about_menu",
        success: (menu) => this.setState({station: menu.station, meals: menu.meals}),
        show_loading: true
    })
  }
  
  render () {
    let {station, meals} = this.state
    const {toggle_modal} = this.props
	const delivery_date = date.this_order_delivery().format(globals.order_date_time_format)
	const day = date.get_day_of_week(date.order_date_to_moment(delivery_date))
    return (
      <div>
        <div className="about-page container-fluid">
          <div className="row banner about-banner">
            <div className="clearfix">
              <div className="col-xs-12">
                <h1 className="title text-uppercase text-center">{globals.app_name}</h1>
              </div>
              <div className="col-xs-12">
                <h3 className="subtitle text-center text-uppercase">
                  Keep working, your food is on its way
                </h3>
              </div>
              <div className="col-xs-12 text-center">
                <button className="btn red-btn margin-right-5" onClick={() => generics.scrollTo("#about")}>
                  Learn More
                </button>
                <button className="btn red-btn" onClick={() => toggle_modal('access_modal', {open: true, step: 0})}>
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            {station &&<div className='col-xs-12 text-center'>
              <h2>{day} at {station.location}</h2>
            </div>}
          </div>
          <div className="row about-section">
            {meals.map(meal => {
              return (
                <div key={meal._id} className='col-sm-3 col-md-2 meal'>
                  <div className='thumbnail clearfix'>
                    <span className='label label-default meal-price'> {'$ '+meal.price} </span>
                    <img src={'images/meals/' + meal.image} alt={meal.name} className='meal-picture'/>
                    <div className='clearfix'>
                      <h5 title={meal.name} className='meal-name text-center'>
                        {meal.name}
                      </h5>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <About />
        <div className="container-fluid">
          <div className="row section-5">
            <div className="col-xs-12 col-sm-2 col-sm-offset-5">
              <button className="btn red-btn" onClick={() => toggle_modal('access_modal', {open: true, step: 0})}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = Welcome
