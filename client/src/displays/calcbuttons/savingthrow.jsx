import React from 'react';

class SavingThrow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      types : ['STR', 'DEX', 'CON', 'CHA', 'INT', 'WIS'],
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

  componentDidMount() {
  }

  render () {
  
    let nat = (this.state.roll === 20) ? <div className='nat-20'>Nat 20!!! Automatic Pass</div> : null;
    nat = (this.state.roll === 1) ? <div className='nat-1'>Nat 1. Automatic Fail</div> : nat;

    let typeSelection = this.state.types.map((element, key) => {
      if (element === this.state.selected) 
        return <div name={element} className="dice-selected" onClick={this.typeSelect} key={key}>{element}</div> 
      return <div name={element} className="dice" onClick={this.typeSelect} key={key}>{element}</div>
    });

    let profstmt = (this.state.applyProf)? '+ Proficiency' : '';
    let rollstmt = '1d20 Roll';

    if (this.state.advantage) {
      rollstmt += '(ADV) '
    } else {
      if (this.state.disadvantage) {
        rollstmt += '(dADV) '
      }
    }

    return (
      <div className="DMCalc-item">
        <div className="calc-header">Saving Throw</div>
        <div className='row-container-st'>
          {typeSelection}
        </div>
        <div className='st-region'> 
          <div>{rollstmt} {profstmt} + Ability modifier = Total </div>
          <div className="st">{this.state.roll} {(this.state.pb !== 0)? `+ ${this.state.pb}` : '' } + {this.state.mod} = {this.state.total}</div>
          {(this.state.secondRoll !== 0)? <div>Second Roll: {this.state.secondRoll}</div> : ''}
          {nat}

            
        </div>
        <button className=".login-button" onClick={this.clickHandler}>Roll</button>
      </div>
    );
  }

}

export default SavingThrow;