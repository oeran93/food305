import React from 'react'

module.exports = (props) => {
  return (
    <div className="about-page container-fluid">
      <a id="about"></a>
      <div className="row about-section">
        <div className="col-xs-12 col-sm-2 col-sm-offset-2">
          <div className="img"><img src="/images/about/membership.png" alt="monthly membership" /></div>
          <div className="about-text text-center"><h4> $9.99 monthly membership </h4></div>
        </div>
        <div className="col-xs-12 col-sm-2 col-sm-offset-1">
          <div className="img"><img src="/images/about/free.png" alt="monthly membership" /></div>
          <div className="about-text text-center"><h4> Free delivery to your station with no minimum order price </h4></div>
        </div>
        <div className="col-xs-12 col-sm-2 col-sm-offset-1">
          <div className="img"><img src="/images/about/calendar.png" alt="no money" /></div>
          <div className="about-text text-center"><h4> Try us for free for a month, subscribe only if you like it</h4></div>
        </div>
      </div>
      <hr />
      <div className="row about-section">
        <div className="col-xs-12 col-sm-2 col-sm-offset-2">
          <div className="img"><img src="/images/about/vimifood.png" alt="order online" /></div>
          <div className="about-text text-center"><h4> Choose your meal on vimifood.com </h4></div>
        </div>
        <div className="col-xs-12 col-sm-2 col-sm-offset-1">
          <div className="img"><img src="/images/about/notification.png" alt="we notify you when food arrives" /></div>
          <div className="about-text text-center"><h4> We notify you when your food arrives at your station, around 12:15 pm </h4></div>
        </div>
        <div className="col-xs-12 col-sm-2 col-sm-offset-1">
          <div className="img"><img src="/images/about/station.png" alt="pick it up at our station" /></div>
          <div className="about-text text-center"><h4> Your stations is only a few steps away, and always inside your building</h4></div>
        </div>
      </div>
      <hr />
      <div className="row about-section">
        <div className="col-xs-12 col-sm-2 col-sm-offset-2">
          <div className="img"><img src="/images/about/restaurant.png" alt="A different restaurant every day, 5 days a week" /></div>
          <div className="about-text text-center"><h4> A different restaurant every day of the week</h4></div>
        </div>
        <div className="col-xs-12 col-sm-2 col-sm-offset-1">
          <div className="img"><img src="/images/about/change.png" alt="We change them monthly" /></div>
          <div className="about-text text-center"><h4> We introduce new restaurants every week </h4></div>
        </div>
        <div className="col-xs-12 col-sm-2 col-sm-offset-1">
          <div className="img"><img src="/images/about/user.png" alt="You decide which stay" /></div>
          <div className="about-text text-center"><h4> You decide which restaurants stay </h4></div>
        </div>
      </div>
    </div>
  )
}
