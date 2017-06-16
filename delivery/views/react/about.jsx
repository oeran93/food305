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

module.exports = () => {
  return (
    <div className="about-page">

      <div className="row banner about-banner">
        <div className="content clearfix">
          <div className="col-xs-12">
            <h1 className="title text-uppercase text-center">{globals.app_name}</h1>
          </div>
          <div className="col-xs-12">
            <h3 className="subtitle text-center text-uppercase">
              Affordable variety, curated excellence, simply convenient
            </h3>
          </div>
          <div className="col-xs-12 text-center">
            <button className="btn red-btn margin-right-5" onClick={() => scrollTo("#about")}>
              Know More
            </button>
            <button className="btn red-btn" onClick={() => scrollTo("#signup")}>
              Sign Up
            </button>
          </div>
        </div>
      </div>

      <a id="about"></a>
      <div className="row about-section section-2">
        <div className="col-xs-12 col-sm-2 col-sm-offset-2">
          <img src="/images/about/phone.png" alt="order online" />
          <h4 className="text-uppercase text-center"> Order Online </h4>
        </div>
        <div className="col-xs-12 col-sm-2 col-sm-offset-1">
          <img src="/images/about/distributor.png" alt="we notify you when food arrives" />
          <h4 className="text-uppercase text-center"> We Notify You When Your Food Arrives </h4>
        </div>
        <div className="col-xs-12 col-sm-2 col-sm-offset-1">
          <img src="/images/about/food.png" alt="pick it up at our station" />
          <h4 className="text-uppercase text-center"> Pick it Up At Our Station </h4>
        </div>
      </div>

      <div className="row about-section section-3">
        <div className="col-xs-12 col-sm-2 col-sm-offset-3">
          <img src="/images/about/membership.png" alt="monthly membership" />
          <h4 className="text-uppercase text-center"> $9.99 Monthly Membership </h4>
        </div>
        <div className="col-xs-12 col-sm-2 col-sm-offset-2">
          <img src="/images/about/money.png" alt="no money" />
          <h4 className="text-uppercase text-center"> No Delivery Fees </h4>
        </div>
      </div>

      <div className="row about-section section-4">
        <div className="col-xs-12 col-sm-2 col-sm-offset-2">
          <img src="/images/about/search.png" alt="We scout the best restaurants" />
          <h4 className="text-uppercase text-center"> We Scout The Best Restaurants For You </h4>
        </div>
        <div className="col-xs-12 col-sm-2 col-sm-offset-1">
          <img src="/images/about/change.png" alt="We change them monthly" />
          <h4 className="text-uppercase text-center"> We Change Them Every Month </h4>
        </div>
        <div className="col-xs-12 col-sm-2 col-sm-offset-1">
          <img src="/images/about/user.png" alt="You decide which stay" />
          <h4 className="text-uppercase text-center"> You Decide Which Stay </h4>
        </div>
      </div>

      <a id="signup"></a>
      <div className="row about-section section-5">
        <div className="col-xs-12 col-sm-6 col-sm-offset-3">
          <Access step={0} autofocus={false}/>
        </div>
      </div>

    </div>
  )
}
