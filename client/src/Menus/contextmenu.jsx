import React from 'react';
import Draggable from "react-draggable";
import DiceRollContextMenu from './contextmenu/diceRollContextMenu';
import SkillCheckContextMenu from './contextmenu/skillCheckContextMenu';
import SavingThrowContextMenu from './contextmenu/SavingThrowContextMenu';
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
    this.closeMenu = this.closeMenu.bind(this);

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

  closeMenu = () => {
    this.setState({showMenu: false});
  }

  render() {
      // ...
    const { showMenu, xPos, yPos } = this.state;

    if (showMenu)
      return (
      <Draggable>

        {/* This indicates the outermost element and is what the Menu "attaches to"*/}
        <div className="position-container" id="menu" style={{
          top: yPos,
          left: xPos,
        }}>

          <DiceRollContextMenu thisPlayer={this.props.thisPlayer} closeMenu={this.closeMenu} logNext={this.props.logNext}/>
          <SkillCheckContextMenu  thisPlayer={this.props.thisPlayer} thisPlayerObj={this.props.thisPlayerObj} closeMenu={this.closeMenu} logNext={this.props.logNext}/>
          <SavingThrowContextMenu thisPlayer={this.props.thisPlayer} thisPlayerObj={this.props.thisPlayerObj} closeMenu={this.closeMenu} logNext={this.props.logNext}/>
        </div>
      </Draggable>
      )
    else return null;
  }
}

export default ContextMenu;


{/* <div className="contextmenu-option">
              
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
              ---
            </div>
          </div> */}
        