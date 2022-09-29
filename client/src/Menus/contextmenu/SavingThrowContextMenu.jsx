import React from 'react';

class SavingThrowContextMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      types : ['STR', 'DEX', 'CON', 'CHA', 'INT', 'WIS'],
      options: ['standard', 'advantage', 'disadvantage'],
      selected : 'STR',
      advantage: false,
      disadvantage: false,
      nat20: false,
      nat1: false,
      roll: 0,
      secondRoll: 0,
      pb: 0,
      mod: 0,
      total: 0,
      applyProf: false,
    };

    this.typeSelect = this.typeSelect.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.modifiers = this.modifiers.bind(this);
    this.proficiencyBonus = this.proficiencyBonus.bind(this);
    this.stSelect = this.stSelect.bind(this);
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


  typeSelect = (e) => {
    let selected = e.target.getAttribute('name');
    let key = selected.toLowerCase();
    
    let modifierBonus = this.modifiers(this.props.thisPlayerProfile.stats[key]);
    let total = modifierBonus;

    let applyProf = this.props.thisPlayerProfile.st[key].proficiency;
    let pb = 0;
    if (applyProf) {
      pb = this.proficiencyBonus(this.props.thisPlayerProfile.level);
      total += pb;
    }


    this.setState({
      selected: selected,
      roll: 0,
      mod: modifierBonus,
      pb: pb,
      total: total,
      applyProf: applyProf,
      advantage: this.props.thisPlayerProfile.st[key].advantage,
      disadvantage: this.props.thisPlayerProfile.st[key].disadvantage,
    });
  }

  clickHandler = () => {

    console.log('this was sent', this.props.thisPlayerProfile);
    let key = this.state.selected.toLowerCase();

    let player = this.props.thisPlayerProfile;
    
    let roll = this.roll('1d20').total;
    let modifierBonus = this.modifiers(player.stats[key]);
    let total = roll + modifierBonus;
    let proficiencyBonus = 0;

    if (this.state.applyProf) {
      proficiencyBonus = this.proficiencyBonus(player.level);
      total += proficiencyBonus;
    }

    let secondRoll = 0; 

    if (this.state.advantage) {
      secondRoll = this.roll('1d20').total;
      if (secondRoll > roll) {
        total -= roll;
        total += secondRoll;
      }
    }

    if (this.state.disadvantage) {
      secondRoll = this.roll('1d20').total;
      if (secondRoll < roll) {
        total -= roll;
        total += secondRoll;
      }
    }
    

    this.setState({
      roll: roll,
      pb: proficiencyBonus,
      mod: modifierBonus,
      total: total,
      secondRoll: secondRoll,
    });
  }

  stSelect = (e) => {
    let st = e.target.getAttribute('name');
    
    let option = st.substring(0, st.indexOf(':'));
    let type = st.substring(st.indexOf(':')+1);
    console.log(`option: ${option}, type: ${type}`);
    let key = option.toLowerCase();

    console.log('key ', key);

    console.log('this player obj: ', this.props.thisPlayerObj);

    let modifierBonus = this.modifiers(this.props.thisPlayerObj.stats[key]);

   
    let applyProf = (this.props.thisPlayerObj.st[key].proficiency)? this.props.thisPlayerObj.st[key].proficiency: 0;

    let pb = 0;
    if (applyProf) {
      pb = this.proficiencyBonus(this.props.thisPlayerObj.level);
    }

    let roll = this.roll('2d20');

    if (type === 'standard') {
      roll = roll.rolls[0];
    }

    if (type === 'advantage') {
      if (roll.rolls[0] > roll.rolls[1]) {
        roll = roll.rolls[0];
      } else {
        roll = roll.rolls[1];
      }
    }

    if (type ==='disadvantage') {
      if (roll.rolls[0] > roll.rolls[1]) {
        roll = roll.rolls[1];
      } else {
        roll = roll.rolls[0];
      }
    }

    let message = this.props.thisPlayer + ` rolls a ${option} saving throw: ${roll}`;
    if (type !== 'standard') {
      message += ` w/ ${type}`;
    }

    message += ` mod: ${modifierBonus} + pb ${pb} for a total of ${roll + modifierBonus + pb}`;

    let obj = {
      speaker: 'status',
      msg: message,
    };

    this.props.sendChat(obj);
    this.props.closeMenu();
  }

  render () {
    let savingThrowList = this.state.types.map((type, i) => 
    <div className="contextmenu-option" name={type} key={i}>{type}
      <div className="submenu">
        {this.state.options.map((option, j) => <div className="sub-option" name={type+':'+option} key={j} onClick={this.stSelect}>{option}</div>)}
      </div>
    </div>
  );
  
    return (
      <div className="contextmenu-container">
        <div className='contextmenu-header'>
          Saving Throws
        </div>
        {savingThrowList}
      </div>
      );
  }

}

export default SavingThrowContextMenu;