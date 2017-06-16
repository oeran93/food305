const React   = require('react')
const Modal = require('react-bootstrap').Modal

module.exports = function (props) {
  let {close, open, action, children, title, action_name} = props
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
