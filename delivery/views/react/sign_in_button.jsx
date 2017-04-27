const React = require('react')
const Access  = require('./access/access.jsx')

class Sign_In_Button extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      show_access: false
    }
  }

  close () {
    this.setState({show_access: false})
  }

  render () {
    let {show_access} = this.state
    return (
      <div>
        <span className='pull-right'>
          <a
            className='btn red-btn'
            role='button'
            onClick={() => this.setState({show_access: true})}>
            Sign in to buy
          </a>
        </span>
        {show_access && <Access close={this.close.bind(this)}/>}
      </div>
    )
  }

}

module.exports = Sign_In_Button
