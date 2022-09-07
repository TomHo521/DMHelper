import React from 'react';
import DiceRoll from './calcbuttons/diceroll';

class DMCalculator extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };

    this.modifiers = this.modifiers.bind(this);
    this.proficiencyBonus = this.proficiencyBonus.bind(this);
    this.savingThrow = this.savingThrow.bind(this);
    this.abilityCheck = this.abilityCheck.bind(this);
    this.roll = this.roll.bind(this);
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

  roll = (dice) => {
    let index = dice.indexOf('d'); 
    let qty = parseInt(dice.substring(0, index));
    let diceType = parseInt(dice.substring(index+1));
  
    var rolls = [];
    var total = 0;
  
    for (var i = 0; i < qty; i++) {
      let single = Math.floor(Math.random() * diceType) + 1;
      total += single;
      rolls.push(single);
    }
    return {
      total: total,
      rolls: rolls,
    }
  }

  render () {

    return (
        <div className="DMCalc-modal" id="DMCalcWindow">
        <div className="magic-modal-content">
            <div className="magic-modal-close" onClick={this.props.closeDMCalcModal}>&times;</div>
            <br></br>
            <h3 className="spellBanner">DM calculator</h3><br></br>   
          <div className="DMCalc-row-container">

            <div className="DMCalc-column-container">
              <DiceRoll roll={this.roll}/>



              <div className="DMCalc-item">Saving Throw 6 types (with or without advantage)
                <br></br>
                <br></br>
                <button className=".login-button">Saving Throw</button>
              </div>
              <div className="DMCalc-item">Ability Check
                <br></br>
                <br></br>
                <button className=".login-button">Ability Check Based of player's stats</button>
              </div>

            </div>


            <div className="DMCalc-column-container">

              <div className="DMCalc-item">Saving Throw 6 types (with or without advantage)
                <br></br>
                <br></br>
                <button className=".login-button">Saving Throw</button>
              </div>
              <div className="DMCalc-item">Ability Check
                <br></br>
                <br></br>
                <button className=".login-button">Ability Check Based of player's stats</button>
              </div>



            
            </div>

  


          </div>     
        </div>
      </div>  
    );
  }
}

export default DMCalculator;


{/* <div className="DMCalc-column-container">
<div className="DMCalc-item">Roll Dice 
  <br></br>
  <br></br>
  <button className=".login-button">Roll Dice</button>
</div>
<div className="DMCalc-item">Saving Throw 6 types (with or without advantage)
  <br></br>
  <br></br>
  <button className=".login-button">Saving Throw</button>
</div>
<div className="DMCalc-item">Ability Check
  <br></br>
  <br></br>
  <button className=".login-button">Ability Check Based of player's stats</button>
</div>
<div> */}