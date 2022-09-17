import React from 'react';
import ActiveGUI from './ActiveGUI';
import InitiativeCheck from './InitiativeCheck';
import adventurerList from '../../test/players.js';
import enemyList from '../../test/enemies.js';
//import MagicMenu from './Menus/magicmenu';
import AdventurerProfile from './displays/adventurerProfile';
import DMCalculator from './displays/DMCalculator';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);


    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.openAdventurerProfileModal = this.openAdventurerProfileModal.bind(this);
    this.closeAdventurerProfileModal = this.closeAdventurerProfileModal.bind(this);
    this.openDMCalcModal = this.openDMCalcModal.bind(this);
    this.closeDMCalcModal = this.closeDMCalcModal.bind(this);
    this.openBonusModal = this.openBonusModal.bind(this);
    this.closeBonusModal = this.closeBonusModal.bind(this);

    //this.openMagicModal - this.openMagicModal.bind(this);
    //this.closeMagicModal - this.closeMagicModal.bind(this);
    
  
    this.state = {
      thisPlayerObj:{},
      displayMagicMenu: false,
    }
  }


  openModal = () => {
    let modal = document.getElementById("initWindow");
    modal.style.display = "block";
  }

  closeModal = () => {
    let modal = document.getElementById("initWindow");
    modal.style.display = "none";
  }

  // openMagicModal = () => {
  //   let modal = document.getElementById("magicWindow");
  //   modal.style.display = "block";
  // }

  // closeMagicModal = () => {
  //   let modal = document.getElementById("magicWindow");
  //   modal.style.display = "none"; 
  // }

  openBonusModal = () => {
    let modal = document.getElementById("bonusWindow");
    modal.style.display = "block";
  }

  closeBonusModal = () => {
    let modal = document.getElementById("bonusWindow");
    modal.style.display = "none"; 
  }

  openAdventurerProfileModal = () => {
    let modal = document.getElementById("adventurerProfileWindow");
    modal.style.display = "block";
  }

  closeAdventurerProfileModal = () => {
    let modal = document.getElementById("adventurerProfileWindow");
    modal.style.display = "none"; 
  }

  openDMCalcModal = () => {
    let modal = document.getElementById("DMCalcWindow");
    modal.style.display = "block";
  }

  closeDMCalcModal = () => {
    let modal = document.getElementById("DMCalcWindow");
    modal.style.display = "none"; 
  }


  componentDidMount () {
    
    for (var i = 0; i < adventurerList.length; i++) {
      if (this.props.thisPlayer === adventurerList[i].name) {
        this.setState({thisPlayerObj: adventurerList[i]});
        this.props.setTopLevelState('thisPlayerProfile', adventurerList[i]);
        console.log('set top level state executed');
        return;
      }
    }

    console.log('error!  Player login not found');
  }

  render() { 

    console.log('this.props.thisPlayerProfile: landing: ', this.props.thisPlayerProfile);

    return ( 
    <div>
      <DMCalculator closeDMCalcModal={this.closeDMCalcModal} thisPlayerObj={this.state.thisPlayerObj} thisPlayerProfile={this.props.thisPlayerProfile} />
      <AdventurerProfile thisPlayer={this.props.thisPlayer} thisPlayerProfile={this.props.thisPlayerProfile} closeAdventurerProfileModal={this.closeAdventurerProfileModal}/>
      
      
      <InitiativeCheck closeModal={this.closeModal}/>
      <ActiveGUI thisPlayerObj={this.state.thisPlayerObj} 
      thisPlayer={this.props.thisPlayer} openModal={this.openModal} 
      // openMagicModal={this.openMagicModal} 
      openAdventurerProfileModal={this.openAdventurerProfileModal}
      openDMCalcModal={this.openDMCalcModal} openBonusModal={this.openBonusModal}
      />
    </div>
  ); }
}
export default LandingPage;


