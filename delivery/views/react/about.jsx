import React from 'react'
import Link from 'react-router-dom'
import globals from '../../../tools/globals.js'
import Access from './access/access.jsx'
import $ from 'jquery'

function scrollTo (id) {
    $('html, body').animate({
        scrollTop: $(id).offset().top
    }, 1500);
}

module.exports = (props) => {
  return (
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
            <button className="btn red-btn margin-right-5" onClick={() => scrollTo("#about")}>
              Know More
            </button>
            <button className="btn red-btn" onClick={() => props.toggleModal('access_modal', {open: true, step: 0})}>
              Sign Up
            </button>
          </div>
        </div>
      </div>

      <a id="about"></a>
      <div className="row about-section section-2">
        <div className="col-xs-12 col-sm-2 col-sm-offset-2">
          <div className="img"><img src="/images/about/phone.png" alt="order online" /></div>
          <div className="about-text text-center text-uppercase"><h4> Order Online </h4></div>
        </div>
        <div className="col-xs-12 col-sm-2 col-sm-offset-1">
          <div className="img"><img src="/images/about/notification.png" alt="we notify you when food arrives" /></div>
          <div className="about-text text-center text-uppercase"><h4> We Notify You </h4></div>
        </div>
        <div className="col-xs-12 col-sm-2 col-sm-offset-1">
          <div className="img"><img src="/images/about/food.png" alt="pick it up at our station" /></div>
          <div className="about-text text-center text-uppercase"><h4> Pick it Up At Our Station </h4></div>
        </div>
      </div>
      <hr />
      <div className="row about-section section-3">
        <div className="col-xs-12 col-sm-2 col-sm-offset-3">
          <div className="img"><img src="/images/about/membership.png" alt="monthly membership" /></div>
          <div className="about-text text-center text-uppercase"><h4> No Delivery Fees <br /> $14.99 Monthly Membership </h4></div>
        </div>
        <div className="col-xs-12 col-sm-2 col-sm-offset-2">
          <div className="img"><img src="/images/about/calendar.png" alt="no money" /></div>
          <div className="about-text text-center text-uppercase"><h4> Free for 2 weeks </h4></div>
        </div>
      </div>
      <hr />
      <div className="row about-section section-4">
        <div className="col-xs-12 col-sm-2 col-sm-offset-2">
          <div className="img"><img src="/images/about/restaurant.png" alt="A different restaurant every day, 5 days a week" /></div>
          <div className="about-text text-center text-uppercase"><h4> A different restaurant every day of the week</h4></div>
        </div>
        <div className="col-xs-12 col-sm-2 col-sm-offset-1">
          <div className="img"><img src="/images/about/change.png" alt="We change them monthly" /></div>
          <div className="about-text text-center text-uppercase"><h4> We Change Them Every Month </h4></div>
        </div>
        <div className="col-xs-12 col-sm-2 col-sm-offset-1">
          <div className="img"><img src="/images/about/user.png" alt="You decide which stay" /></div>
          <div className="about-text text-center text-uppercase"><h4> You Decide Which Stay </h4></div>
        </div>
      </div>

      <div className="row section-5">
        <div className="col-xs-4 col-xs-offset-4">
          <button className="btn red-btn" onClick={() => props.toggleModal('access_modal', {open: true, step: 0})}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  )
}
