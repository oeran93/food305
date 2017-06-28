import {Tooltip, OverlayTrigger} from 'react-bootstrap'
import React from 'react'

class MyTooltip extends React.Component {

  render() {
    return (
      <OverlayTrigger
        overlay={<Tooltip>{this.props.tooltip}</Tooltip>} placement="top"
        delayShow={100} delayHide={150}
      >
        {this.props.children}
      </OverlayTrigger>
    )
  }

}

module.exports = MyTooltip
