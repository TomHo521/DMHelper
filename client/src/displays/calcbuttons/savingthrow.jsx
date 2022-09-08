import React from 'react';

class SavingThrow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      types : ['STR', 'DEX', 'CON', 'CHA', 'INT', 'WIS'],
      selected : 'STR',
      advantage: false,
      nat20: false,
      nat1: false,
      roll: 0,
      pb: 0,
      mod: 0,
      total: 0,
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
    this.setState({selected: e.target.getAttribute('name')});
  }

  clickHandler = () => {

    console.log('this was sent', this.props.thisPlayerProfile);
    let key = this.state.selected.toLowerCase();
    
    console.log('this is key', key);

    let statNum = this.props.thisPlayerObj.stats[key];

    console.log('acquired stat num: should be 15: ',this.props.thisPlayerProfile.stats[key]);

    let roll = this.roll('1d20').total;
    let proficiencyBonus = this.proficiencyBonus(this.props.thisPlayerProfile.level);
    let modifierBonus = this.modifiers(this.props.thisPlayerProfile.stats[key]);
    let total = roll + proficiencyBonus + modifierBonus;

    this.setState({
      roll: roll,
      pb: proficiencyBonus,
      mod: modifierBonus,
      total: total,
    });


  }

  componentDidMount() {
    // let proficiencyBonus = this.proficiencyBonus(this.props.thisPlayerProfile.level);
    // let key = this.state.selected.toLowerCase();
    // let modifierBonus = this.modifiers(this.props.thisPlayerProfile.stats[key]);

    // this.setState({
    //   pb: proficiencyBonus,
    //   mod: modifierBonus,
    // })
  }


  render () {
    // console.log('this was sent', this.props.thisPlayerObj);
    let nat = (this.state.roll === 20) ? <div className='nat-20'>Nat 20!!! Automatic Pass</div> : null;
    nat = (this.state.roll === 1) ? <div className='nat-1'>Nat 1. Automatic Fail</div> : nat;

    let typeSelection = this.state.types.map((element, key) => {
      if (element === this.state.selected) 
        return <div name={element} className="dice-selected" onClick={this.typeSelect} key={key}>{element}</div> 
      return <div name={element} className="dice" onClick={this.typeSelect} key={key}>{element}</div>
    });

    return (
      <div className="DMCalc-item">
        <div className="calc-header">Saving Throw</div>
        <div className='row-container-st'>
          {typeSelection}
        </div>
        <div className='st-region'> 
          <div>1d20 roll + prof bonus(if app.) + ability mod = total </div>
          <div className="st">{this.state.roll} + {this.state.pb} + {this.state.mod} = {this.state.total}</div>
          {nat}

            
        </div>
        <button className=".login-button" onClick={this.clickHandler}>Roll</button>
      </div>
    );
  }

}

export default SavingThrow;