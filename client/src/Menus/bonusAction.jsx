import React from 'react';

class BonusActionMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render () {
    return (
      <div>
        <div className="option-submenu" onClick={this.props.openBonusModal}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        Bonus Action #1
        </div>
        <div class="option-submenu">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        Bonus Action #2
        </div>
        <div class="option-submenu">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        Bonus Action #3
        </div>
      </div> 
  )

  }
}

export default BonusActionMenu;