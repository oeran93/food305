const React   = require('react')
const Modal = require('react-bootstrap').Modal

module.exports = React.createClass({

  propTypes: {
    open: React.PropTypes.bool.isRequired,
    close: React.PropTypes.func.isRequired,
    action: React.PropTypes.func.isRequired,
    action_name: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
  },

  render: function() {
    let {close, open, action, children, title, action_name} = this.props
    return (
      <Modal
        show={open}
        onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title><b>{title}</b></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {children}
        </Modal.Body>
        <Modal.Footer>
          <button className='btn red-btn' onClick={() => {action()}}>
            {action_name}
          </button>
        </Modal.Footer>
      </Modal>
    )
  }
})