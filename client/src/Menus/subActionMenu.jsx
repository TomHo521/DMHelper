import React from 'react';

class SubActionMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render () {
    return (
      <div>
        <div className="option-submenu" onClick={this.props.openMagicModal}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          Magic   
        </div>
        <div class="option-submenu">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          Item
        </div>
        <div class="option-submenu">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          Misc
        </div>
      </div> 
  )

  }
}

export default SubActionMenu;