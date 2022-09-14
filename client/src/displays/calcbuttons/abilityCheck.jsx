import React from 'react';
import abilityChecks from '../../../../test/abilitychecks';
import SkillItem from './skillitem';

class AbilityCheck extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      abilityChecks: abilityChecks,
      selected: 'athletics',
      advantage: false,
      nat20: false,
      nat1: false,
      pb: 0,
      mod: 0,
      total: 0,
      roll: 0,
    };

    this.selectHandler = this.selectHandler.bind(this);
    this.rollHandler = this.rollHandler.bind(this);
    this.roll = this.roll.bind(this);
    this.modifiers = this.modifiers.bind(this);
    this.proficiencyBonus = this.proficiencyBonus.bind(this);
  }

  // abilityCheck = (statName, stat, checkValue) => {
  //   let roll = Math.floor(Math.random() * 20);
  //   let checkRoll = roll + computeModifiers(stat);
  //   let pass = false;
  //   let msg;

  //   if (checkRoll >= checkValue){
  //     pass = true;
  //     msg = statName + 'check passed';
  //   }

  //   if (roll === 1) {
  //     pass = false;
  //     msg = statName + 'check failed with a Nat 1 roll.  :(';
  //   }

  //   if (roll === 20) {
  //     pass = true;
  //     msg = statName + 'check passed with a Nat 20 roll! :)';
  //   }

  //   return {
  //     roll: roll,
  //     checkRoll: roll + computeModifiers(stat),
  //     pass: pass,
  //     msg: msg,
  //   }
  // }


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


  selectHandler = (e) => {
    this.setState({
      selected:  e.target.getAttribute('name'),
    });
  }

  rollHandler = () => {
    //compute the modifiers
    let typeOfCheck = this.state.abilityChecks[this.state.selected];

    console.log('type of check selected: ', typeOfCheck);

    let relevantStat = this.props.thisPlayerProfile.stats[typeOfCheck];
    console.log('stat value acquired: ', relevantStat);
    
    let mod = this.modifiers(relevantStat);
    let pb = this.proficiencyBonus(this.props.thisPlayerProfile.level);
    let roll = this.roll('1d20').total;
    let total = mod + pb + roll;
    let nat20 = (roll === 20) ? true : false;
    let nat1 = (roll === 1) ? true : false;

    this.setState({
      roll: roll,
      mod: mod,
      pb: pb,
      total: total,
      nat20: nat20,
      nat1: nat1,
    });

  }


  render () {

    let nat = (this.state.roll === 20) ? <div className='nat-20'>Nat 20!!! Automatic Pass</div> : null;
    nat = (this.state.roll === 1) ? <div className='nat-1'>Nat 1. Automatic Fail</div> : nat;

    let typeKeys = Object.keys(this.state.abilityChecks.types);
    let checksList = typeKeys.map((element, index) => {
      return (
        <dl>
          <dt className="dt-type">{element}</dt>
          {this.state.abilityChecks.types[element].map(subele => 
             <SkillItem selected={this.state.selected} skill={subele} clickHandler={this.selectHandler} player={this.props.thisPlayerProfile}/>
            )}
        </dl>
      )
    })

    return (
      <div className="AC-item">
        <div className="calc-header">Ability Check</div>
        <div className='ac-row-container'>
          {checksList}
        </div>
        <div className='st-region'> 

          <div>1d20 roll + prof bonus(if app.) + ability mod = total </div>
          <div className="st">{this.state.roll} + {this.state.pb} + {this.state.mod} = {this.state.total}</div>
          {nat}
        </div>
        <button className=".login-button" onClick={this.rollHandler}>Roll {this.state.selected}</button>
      </div>
    );
  }

}

export default AbilityCheck;



// <dd name={subele} className="dd-selected" onClick={this.selectHandler}> {subele} if </dd> : <dd name={subele} className="dd-unselected" onClick={this.selectHandler}>{subele}</dd>