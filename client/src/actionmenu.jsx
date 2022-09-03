import React from 'react';
import SubActionMenu from './subActionMenu.jsx';

class ActionMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

      displaySubActions: false,

    }
  }

  render () {

    let subActionMenu = (this.state.displaySubActions) ? <SubActionMenu/> : null;

    return (
      <div className="action-menu">
        <div className="option">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        Action
        </div>
        {SubActionMenu}
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