import React from 'react'
import Link from 'react-router-dom'
import globals from '../../../tools/globals.js'
import Access from './access/access.jsx'
import generics from '../../../tools/generics.js'
import About from './about.jsx'

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
            <button className="btn red-btn margin-right-5" onClick={() => generics.scrollTo("#about")}>
              Learn More
            </button>
            <button className="btn red-btn" onClick={() => props.toggle_modal('access_modal', {open: true, step: 0})}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
      <About />
      <div className="row section-5">
        <div className="col-xs-12 col-sm-2 col-sm-offset-5">
          <button className="btn red-btn" onClick={() => props.toggle_modal('access_modal', {open: true, step: 0})}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  )
}
