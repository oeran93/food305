import React from 'react'
import globals from '../../../tools/globals.js'

module.exports = function (props) {
  return (
    <div className="row banner">
      <div className="col-xs-12">
        <h1 className="text-uppercase text-center">{globals.app_name}</h1>
      </div>
      <div className="col-xs-12">
        <h3 className="text-center text-uppercase">
          Affordable variety, curated excellence, simply convenient
        </h3>
      </div>
      <div className="col-xs-12 text-center">
        <a href="#about" className="btn red-btn margin-right-5">Know More</a>
        <a href="#signup" className="btn red-btn">Sign Up</a>
      </div>
    </div>
  )
}
