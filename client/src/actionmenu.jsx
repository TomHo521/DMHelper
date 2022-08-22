import React from 'react';

class ActionMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render () {
    return (
      <div className="action-menu">
        <div className="option">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        Action
        </div>
        <div className="option">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        Bonus Action
        </div>
        <div className="option">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        Run
        </div>
      </div>
  )

  }
}

export default ActionMenu;