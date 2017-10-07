const React = require('react')
const $     = require('jquery')
const _ = require('underscore')
import PropTypes from 'prop-types'

class Select_Input extends React.Component {
  
  constructor (props) {
    super(props)
    this.state = {
      input: '',
      current_tags: props.current_tags
    }
  }
  
  add_tag (tag) {
    let {handle_change} = this.props
    let tags = this.state.current_tags
    tags.push(tag)
    this.setState({current_tags: tags})
    handle_change(tags)
  }
  
  remove_tag (tag) {
    let {handle_change} = this.props
    let tags = this.state.current_tags
    const index = tags.indexOf(tag)
    tags.splice(index, 1)
    this.setState({current_tags: tags})
    handle_change(tags)
  }
  
  render () {
    let options = _.difference(this.props.options, this.state.current_tags) 
    let {current_tags} = this.state
    return (
      <div className="select-input">
        <div className='tags-to-select'>
            Options: {options.map((option,i) => {
              return <span key={option} className='tag label-primary margin-left-5' onClick={() => this.add_tag(option)}>{option}</span> 
            })}
        </div>
        <div className="selected-tags">
          Your choices: {current_tags.map((tag,i) => {
            return (<span key={tag} className='tag label-success margin-left-5'>
                {tag} <span onClick={() => this.remove_tag(tag)}>x</span>
              </span>)
          })}
        </div>
      </div>
    )
  }
  
}

Select_Input.propTypes = {
  options: PropTypes.array,
  current_tags: PropTypes.array,
  handle_change: PropTypes.func
}

module.exports = Select_Input