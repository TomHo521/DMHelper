import React from 'react';
import ActiveGUI from './ActiveGUI';
import InitiativeCheck from './InitiativeCheck';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.modifiers = this.modifiers.bind(this);
    this.proficiencyBonus = this.proficiencyBonus.bind(this);
    this.savingThrow = this.savingThrow.bind(this);
    this.abilityCheck = this.abilityCheck.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.state = {
       login: 'zomho',
       playerList: ['Midir', 'Lia', 'Pergilius von Waxilium', 'Zovinar', 'Cassian', 'Po'],
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

    console.log('openModal being called');
  }

  closeModal() {
    let modal = document.getElementById("initWindow");
    modal.style.display = "none";
  }

  render() { return ( 
    <div>
      <InitiativeCheck closeModal={this.closeModal} playerList={this.state.playerList}/>
      <ActiveGUI login={this.state.login} openModal={this.openModal}/>
    </div>
  ); }
}
export default App;
