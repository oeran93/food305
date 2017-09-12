import React from 'react'
import PropTypes from 'prop-types'
import Profile_Banner from './profile_banner.jsx'
import Editable_Text from './editable_text.jsx'
import Uneditable_Text from './uneditable_text.jsx'
import Editable_Select from './editable_select.jsx'
import Editable_Credit_Card from './editable_credit_card.jsx'
import Editable_Pwd from './editable_pwd.jsx'
import Change_Pwd from './access/change_pwd.jsx'
import _ from 'underscore'
const ajx = require('../../../tools/ajax.js')()

class Profile extends React.Component {

  constructor (props) {
    super(props)
  }
  
  on_change (change) {
    if (change.name == "station") {
      window.store.set('user.station._id', change.value.value)
      window.store.set('user.station.location', change.value.text)
    } else window.store.set('user.'+change.name, change.value)
    const data = {}
    data[change.name] = change.value
    ajx.call({
      method: "POST",
      url: "/edit_user",
      data,
      success_message: "Your profile has been successfully updated",
      show_loading: true,
      show_messages: true,
    })
  }
  
  unsubscribe () {
    window.store.set('user.subscribed', false)
    if (confirm("Are you sure you want to unsubscribe from your delivery plan?")) {
      ajx.call({
        method: "POST",
        url: "/unsubscribe",
        success_message: "You have been usubscribed from our delivery plan",
        show_loading: true,
        show_messages: true,
      })
    }
  }

  render () {
    let {name,phone,email,station,last_4_digits,subscribed} = window.store.get('user')
    return (
      <div>
        <Profile_Banner/>
        <div className="container profile">
            <Uneditable_Text name="Phone" icon="phone" value={phone} />
            <Uneditable_Text name="Email" icon="envelope" value={email} />
            <Editable_Text prop_name="name" icon="user" name="Name" value={name} handleChange={this.on_change.bind(this)}/>
            <Editable_Select 
              icon="map-marker"
              prop_name="station"
              name="Station" 
              option={{text:station.location, value: station._id}} 
              get_options_url="get_stations"
              value_prop="_id" 
              text_prop="location" 
              handleChange={this.on_change.bind(this)}
            />
            <Editable_Credit_Card prop_name="card" name="Card on file" last_4_digits={last_4_digits}/>
            {subscribed 
              &&
              <h3 className="row">
                <div className="col-xs-12">
                  <div className="pull-left"><span className="label label-default"><span className={"fa fa-id-card"}></span> Subscription</span> You are subscribed to our $9.99 monthly plan</div>
                  <div className="pull-right">
                    <span className="btn btn-info pull-right" onClick={this.unsubscribe.bind(this)}> Unsubscribe </span>
                  </div>
                </div>
              </h3>
            }
            <Editable_Pwd />
        </div>
      </div>
    )
  }

}

module.exports = Profile
