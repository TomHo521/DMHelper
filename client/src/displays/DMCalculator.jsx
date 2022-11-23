import React from 'react';
import DiceRoll from './calcbuttons/diceroll';
import SavingThrow from './calcbuttons/savingthrow';
import AbilityCheck from './calcbuttons/abilityCheck';

class DMCalculator extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };

    this.modifiers = this.modifiers.bind(this);
    this.proficiencyBonus = this.proficiencyBonus.bind(this);
    
  }

  
  modifiers = (stat) => {
     return Math.floor((stat - 10)/2);
  }

  proficiencyBonus = (level) => {
     return Math.floor((2 + (level - 1))/4);
  }


  render () {

    console.log('this.props.thisPlayerProfile: DMcalc: ', this.props.thisPlayerProfile);

    return (
        <div className="DMCalc-modal" id="DMCalcWindow">
        <div className="calc-modal-content">
            <div className="close-button" onClick={this.props.closeDMCalcModal}>&times;</div>
            <div className='calc-modal-header'>
              <h1>DM Calculator</h1>
            </div>
            <br></br>

          <div className="center-container">
          

            {/* <div className="DMCalc-column-container"> */}
              <DiceRoll roll={this.roll}/>
              <SavingThrow thisPlayerObj={this.props.thisPlayerObj} thisPlayerProfile={this.props.thisPlayerProfile}/>
              <AbilityCheck thisPlayerObj={this.props.thisPlayerObj} thisPlayerProfile={this.props.thisPlayerProfile}/>
            {/* </div> */}
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


{/* <div className="DMCalc-row-container">

<div className="DMCalc-column-container">
  <DiceRoll roll={this.roll}/>
  <SavingThrow thisPlayerObj={this.props.thisPlayerObj} thisPlayerProfile={this.props.thisPlayerProfile}/>
  <AbilityCheck thisPlayerObj={this.props.thisPlayerObj}/>
</div>

</div>  */}