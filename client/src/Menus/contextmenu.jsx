import React from 'react';

class ContextMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      xPos: '0px',
      yPos: '0px',
      showMenu: false,
      subMenuPos: '100%',
    }

    this.onMouseEnterLeft = this.onMouseEnterLeft.bind(this);
    this.onMouseEnterRight = this.onMouseEnterRight.bind(this);

  }


  componentDidMount() {
      document.addEventListener("click", this.handleClick);
      document.addEventListener("contextmenu", this.handleContextMenu);
  }

  componentWillUnmount() {
      document.removeEventListener("click", this.handleClick);
      document.removeEventListener("contextmenu", this.handleContextMenu);
  }

  handleClick = (e) => {
    //only close the menu if we click outside of it.
    if (!document.getElementById('menu').contains(e.target)) {
      if (this.state.showMenu) this.setState({ showMenu: false });
    }
  }

  handleContextMenu = (e) => {
    e.preventDefault();
  
    this.setState({
      xPos: `${e.pageX}px`,
      yPos: `${e.pageY}px`,
      showMenu: true,
      subMenuPos: '-96%',
    });
  };

  onMouseEnterLeft = (e) => {
    this.setState({subMenuPos: '-96%'});

  }

  onMouseEnterRight = (e) => {
    this.setState({subMenuPos: '100%'});
  }

  render() {
      // ...
    const { showMenu, xPos, yPos } = this.state;

    if (showMenu)
      return (
        <div className="position-container" id="menu" style={{
          top: yPos,
          left: xPos,
        }}>
          <div className="contextmenu-container">
            <div className='contextmenu-header'>
               header
            </div>
            <div className="contextmenu-option">
              <div className='left-submenu' style={{left:this.state.subMenuPos}} onMouseEnter={this.onMouseEnterLeft}>←</div> option #1 <div style={{left:this.state.subMenuPos}} className='right-submenu' onMouseEnter={this.onMouseEnterRight}>→</div>
              <div className="submenu" style={{left:this.state.subMenuPos}}>
                 
                  <div className="sub-option">
                    sub-option #1
                  </div>
                  <div className="sub-option">
                    sub-option #2
                  </div>
                  <div className="sub-option">
                    sub-option #3
                  </div>
                
              </div>
            </div>
            <div className="contextmenu-option">
              option #2
            </div>
            <div className="contextmenu-option">
              option #2
            </div>
            <div className='contextmenu-header'>
              footer
            </div>
          </div>
        </div>
      )
    else return null;
  }
}

export default ContextMenu;