import React from 'react';
import ActiveGUI from './ActiveGUI';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.modifiers = this.modifiers.bind(this);
    this.proficiencyBonus = this.proficiencyBonus.bind(this);
    this.savingThrow = this.savingThrow.bind(this);
    this.abilityCheck = this.abilityCheck.bind(this);

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

  render() { return ( 
    <ActiveGUI/>
  ); }
}
export default App;
