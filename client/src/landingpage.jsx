import React from 'react';
import ActiveGUI from './ActiveGUI';
import InitiativeCheck from './InitiativeCheck';
import adventurerList from '../../test/players.js';
import enemyList from '../../test/enemies.js';
import MagicMenu from './Menus/magicmenu';
import AdventurerProfile from './displays/adventurerProfile';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);

    this.modifiers = this.modifiers.bind(this);
    this.proficiencyBonus = this.proficiencyBonus.bind(this);
    this.savingThrow = this.savingThrow.bind(this);
    this.abilityCheck = this.abilityCheck.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openMagicModal = this.openMagicModal.bind(this);
    this.closeMagicModal = this.closeMagicModal.bind(this);
    this.openAdventurerProfileModal = this.openAdventurerProfileModal.bind(this);
    this.closeAdventurerProfileModal = this.closeAdventurerProfileModal.bind(this);
  
    this.state = {
      thisPlayerObj:{},
      displayMagicMenu: false,
    }
  }

  savingThrow = () => {
  }
  
  abilityCheck = (statName, stat, checkValue) => {
    let roll = Math.floor(Math.random() * 20);
    let checkRoll = roll + computeModifiers(stat);
    let pass = false;
    let msg;

    if (checkRoll >= checkValue){
      pass = true;
      msg = statName + 'check passed';
    }

    if (roll === 1) {
      pass = false;
      msg = statName + 'check failed with a Nat 1 roll.  :(';
    }

    if (roll === 20) {
      pass = true;
      msg = statName + 'check passed with a Nat 20 roll! :)';
    }

    return {
      roll: roll,
      checkRoll: roll + computeModifiers(stat),
      pass: pass,
      msg: msg,
    }
  }

  modifiers = (stat) => {
     return Math.floor((stat - 10)/2);
  }

  proficiencyBonus = (level) => {
     return Math.floor((2 + (level - 1))/4);
  }

  openModal() {
    let modal = document.getElementById("initWindow");
    modal.style.display = "block";
  }

  closeModal() {
    let modal = document.getElementById("initWindow");
    modal.style.display = "none";
  }

  openMagicModal() {
    let modal = document.getElementById("magicWindow");
    modal.style.display = "block";
  }

  closeMagicModal = () => {
    let modal = document.getElementById("magicWindow");
    modal.style.display = "none"; 
  }

  openAdventurerProfileModal() {
    let modal = document.getElementById("adventurerProfileWindow");
    modal.style.display = "block";
  }

  closeAdventurerProfileModal = () => {
    let modal = document.getElementById("adventurerProfileWindow");
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

    return ( 
    <div>
      <AdventurerProfile thisPlayer={this.props.thisPlayer} thisPlayerProfile={this.props.thisPlayerProfile} closeAdventurerProfileModal={this.closeAdventurerProfileModal}/>
      <MagicMenu closeMagicModal={this.closeMagicModal}/>
      <InitiativeCheck closeModal={this.closeModal}/>
      <ActiveGUI thisPlayerObj={this.state.thisPlayerObj} 
      thisPlayer={this.props.thisPlayer} openModal={this.openModal} 
      openMagicModal={this.openMagicModal} openAdventurerProfileModal={this.openAdventurerProfileModal}/>
    </div>
  ); }
}
export default LandingPage;


