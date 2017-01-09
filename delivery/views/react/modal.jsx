var React = require('react');
const Modal = require('react-bootstrap').Modal

var MyModal = React.createClass({

  propTypes: {
    open: React.PropTypes.bool.isRequired,
    close: React.PropTypes.func.isRequired,
    action: React.PropTypes.func.isRequired,
    actionName: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
  },

  render: function() {
    let {close, open, action, children, title, actionName} = this.props
    return (
      <Modal
        show={open}
        onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {children}
        </Modal.Body>
        <Modal.Footer>
          <button className='btn btn-primary btn-outline' onClick={() => {action();close()}}>
            {actionName}
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
});

module.exports = MyModal;