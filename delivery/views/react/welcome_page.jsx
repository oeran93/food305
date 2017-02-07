const React      = require('react')
const cookies    = require('../../../tools/cookies.js')
const Info_Layer = require('./info_layer.jsx')
const config     = require('../../../tools/config.js')

module.exports = React.createClass({

  getInitialState: function () {
    return {
      section: 1,
      phone: ''
    }
  },

  start: function () {
    cookies.set_cookie("new_user", "no", 30)
  },

  render: function() {
    let {section, phone} = this.state
    let content = null
    return (
      <div>
        { section === 1 &&
          <Info_Layer
            title = {[<span className='text-uppercase'>{config.app_name}</span>]}
            body = "We bring your favorite restaurants to campus"
            action = {() => this.setState({section: 2})}
            action_name = "Next 1/4"
          >
          </Info_Layer>
        }
        {section === 2 &&
          <Info_Layer
            title = "How"
            body = {[<div className="bottom-space"> We deliver food from local resturants directly to campus</div>,
                     <div className="bottom-space"><b>Don't pay delivery fees</b></div> ]}
            action = {() => this.setState({section: 3})}
            action_name = "Next 2/4"
          />
        }
        {section === 3 &&
          <Info_Layer
            title = "When/Where"
            body = "Every day @ 1 pm in the DUC lounge"
            action = {() => this.setState({section: 4})}
            action_name = "Next 3/4"
          />
        }
        {section === 4 &&
          <Info_Layer
            title = "Ready?"
            body = {[<div className="bottom-space"> Try us for 1 month </div>,
                     <div className="bottom-space"> If you decide we are worth $10/month, subscribe</div> ]}
            action = {() => {this.setState({section: 5}); this.start()}}
            action_name = "Got it"
          />
        }
        {section === 5 &&
          <Info_Layer
            title = "See you soon"
            body = {[<div className="bottom-space">We will notify you when your free month starts</div>]}
            action = {() => window.location.href = 'https://docs.google.com/forms/d/1Xi1xNuDrdTJoJq3fgaHtbktOFy8spDIRzrxul4VewT8/edit'}
            action_name = "Notify me"
          />
        }
      </div>
    )
  }

})

// <div className='input-group top-space info-box-input'>
//               <input id='phone' type="text" className="form-control" placeholder="phone" value={phone} onChange={this.handle_change}/>
//               <span className="input-group-btn">
//                 <button className="btn red-btn" type="button" onClick={() => {this.submit({phone});this.setState({section: 2})}}> Next 1/5 </button>
//               </span>
//             </div>

// submit: function (data) {
//     this.setState({data})
//     $.ajax({
//       url: '/update_user/set_phone',
//       type: "POST",
//       data: data
//     })
//   },

//   handle_change: function (event) {
//     let state = this.state
//     state[event.target.id] = event.target.value
//     this.setState(state)
//   },