import React from 'react';
import abilityChecks from '../../../../test/abilitychecks';
import SkillItem from './skillitem';

class SkillCheckContextMenu extends React.Component {
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
      secondRoll: 0,
      applyProf: false,
      disadvantage: false,
      expertise: false,
    };

    this.selectHandler = this.selectHandler.bind(this);
    this.rollHandler = this.rollHandler.bind(this);
    this.roll = this.roll.bind(this);
    this.modifiers = this.modifiers.bind(this);
    this.proficiencyBonus = this.proficiencyBonus.bind(this);
    this.skillSelect = this.skillSelect.bind(this);
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


  selectHandler = (e) => {
    let key = e.target.getAttribute('name').toLowerCase();

    let skill = this.props.thisPlayerProfile.skills[key];
    let applyProf; 
    let pb = 0;
    let total = 0;
    let secondRoll = 0;
    

    let typeOfCheck = this.state.abilityChecks[this.state.selected];
   
    let relevantStat = this.props.thisPlayerProfile.stats[typeOfCheck];
    let mod = this.modifiers(relevantStat);
    let advantage = false;
    let disadvantage = false;
    let expertise = false;

    total += mod;

    if (skill) {
      applyProf = skill.proficiency;
      if (applyProf) {
        pb = this.proficiencyBonus(this.props.thisPlayerProfile.level);
        total += pb;
      }

      expertise = skill.expertise;
      if (expertise) {
        total += pb;
      }

      advantage = skill.advantage;
      if (advantage) {
        secondRoll = this.roll('1d20').total;
        if (secondRoll > roll) {
          total -= roll;
          total += secondRoll;
        }
      }

      disadvantage = skill.disadvantage;
      if (disadvantage) {
        secondRoll = this.roll('1d20').total;
        if (secondRoll < roll) {
          total -= roll;
          total += secondRoll;
        }
      }

      //other conditions to go here

    }

    let roll = 0;


    this.setState({
      selected:  e.target.getAttribute('name'),
      roll: roll,
      pb: pb,
      applyProf: applyProf,
      mod: mod,
      total: total,
      secondRoll: secondRoll,
      advantage: advantage,
      disadvantage: disadvantage,
      expertise: expertise,
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
    let total = mod + roll;
    let nat20 = (roll === 20) ? true : false;
    let nat1 = (roll === 1) ? true : false;

    if (this.state.applyProf) {
      total += pb;
    }

    if (this.state.expertise) {
      total += pb;
    }

    this.setState({
      roll: roll,
      mod: mod,
      pb: pb,
      total: total,
      nat20: nat20,
      nat1: nat1,
    });

  }


  skillSelect = (e) => {
    let st = e.target.getAttribute('name');
    
    let option = st.substring(0, 3);
    let skill = st.substring(st.indexOf(':')+1);
    console.log(`option: ${key}, skill: ${skill}`);
    let key = option.toLowerCase();

    console.log('key "',key,'"');

    console.log('this player obj: ', this.props.thisPlayerObj);

    let modifierBonus = this.modifiers(this.props.thisPlayerObj.stats[key]);
    let applyProf = (this.props.thisPlayerObj.st[key].proficiency)? this.props.thisPlayerObj.st[key].proficiency: 0;

    let pb = 0;
    if (applyProf) {
      pb = this.proficiencyBonus(this.props.thisPlayerObj.level);
    }

    let roll = this.roll('1d20').total;

    // if (type === 'standard') {
    //   roll = roll.rolls[0];
    // }

    // if (type === 'advantage') {
    //   if (roll.rolls[0] > roll.rolls[1]) {
    //     roll = roll.rolls[0];
    //   } else {
    //     roll = roll.rolls[1];
    //   }
    // }

    // if (type ==='disadvantage') {
    //   if (roll.rolls[0] > roll.rolls[1]) {
    //     roll = roll.rolls[1];
    //   } else {
    //     roll = roll.rolls[0];
    //   }
    // }

    let message = this.props.thisPlayer + ` rolls ${skill}: ${roll}`;
    // if (type !== 'standard') {
    //   message += ` w/ ${type}`;
    // }

    message += ` mod: ${modifierBonus} + pb ${pb} for a total of ${roll + modifierBonus + pb}`;

    //this.props.logNext(message);
    // socket.emit('chat', {
    //   speaker: 'status',
    //   msg: message,
    // });
    let obj = {
      speaker: 'status',
      msg: message,
    };

    this.props.sendChat(obj);

    this.props.closeMenu();
  }



  render () {
     
    let skillsList = Object.keys(this.state.abilityChecks.types).map((type, i) => 
    <div className="contextmenu-option" name={type} key={i}>{type}
      <div className="submenu">
        {this.state.abilityChecks.types[type].map((skill, j) => <div className="sub-option" name={type+':'+skill} key={j} onClick={this.skillSelect}>{skill}</div>)}
      </div>
    </div>
    );

  return(
      <div className="contextmenu-container">
        <div className='contextmenu-header'>
          Skill Checks
        </div>
        {skillsList}
      </div>
    );
  }

}

export default SkillCheckContextMenu;


