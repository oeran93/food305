const React        = require('react')
const errors       = require('../../../../tools/errors.js')
const PropTypes    = require('prop-types')
const ajx = require('../../../../tools/ajax.js')()
const confirmation = require('../../../../tools/confirmation.js')()

class Basic_Info extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      phone: "",
      name: "",
      email: "",
      station: "",
      terms_and_conditions: false
    }
  }

  componentWillMount () {
    ajx.call({
      method: 'GET',
      url:'/get_stations',
      success: (data) => {
        this.setState({station: data[0]})
      }
    })
  }
  
  terms_and_conditions () {
    this.setState((prevState) => ({
      terms_and_conditions: !prevState.terms_and_conditions
    }))
  }

  handle_change (event) {
    let state = this.state
    state[event.target.id] = event.target.value
    console.log(state)
    this.setState(state)
  }

  send_info () {
    let {change_step} = this.props
    let {terms_and_conditions, phone} = this.state
    if (terms_and_conditions) {
      ajx.call({
        method: 'POST',
        url: '/create_user',
        data : this.state,
        success: (res) => change_step({step: 1, phone}),
        error: (res) => {if (res.error.number == errors.user_exists.number) change_step({step: 3})},
        show_messages: true,
        show_loading: true
      })
    } else confirmation.failure("Please accept the terms and conditions")
    
  }

  render () {
    let {phone, name, email, terms_and_conditions} = this.state
    let {autofocus} = this.props
    return (
      <div className='row access'>
        <div className='col-xs-12 text-center text-uppercase'>
          <h3>Welcome to our community</h3>
        </div>
        <div className='col-xs-12 input'>
          <input
            autoFocus={autofocus}
            id="phone"
            type="text"
            className="basic-input"
            value={phone}
            placeholder="Phone"
            onChange={this.handle_change.bind(this)}
            onKeyPress={(t) => {if (t.charCode === 13) this.send_info.bind(this)()}}
          />
        </div>
        <div className='col-xs-12 input'>
          <input
            id="name"
            type="text"
            className="basic-input"
            value={name}
            placeholder="First Name"
            onChange={this.handle_change.bind(this)}
            onKeyPress={(t) => {if (t.charCode === 13) this.send_info.bind(this)()}}
          />
        </div>
        <div className='col-xs-12 input'>
          <input
            id="email"
            type="text"
            className="basic-input"
            value={email}
            placeholder="Email"
            onChange={this.handle_change.bind(this)}
            onKeyPress={(t) => {if (t.charCode === 13) this.send_info.bind(this)()}}
          />
        </div>
        <div className="col-xs-12 input">
          <h5> <input type="checkbox" onChange={this.terms_and_conditions.bind(this)} checked={terms_and_conditions}/> <a target="_blank" href="/terms_and_conditions.pdf"> I Accept the terms and conditions</a></h5>
        </div>
        <div className='col-xs-12'>
          <button className='btn red-btn pull-right' onClick={this.send_info.bind(this)}>
            Next
          </button>
        </div>
      </div>
    )
  }

}

Basic_Info.propTypes = {
  change_step: PropTypes.func.isRequired,
  autofocus: PropTypes.bool
}

module.exports = Basic_Info
