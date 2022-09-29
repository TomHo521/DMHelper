import React from 'react';
import { roll as importRoll } from '../../../../server/DMMath';

class DiceRollContextMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      availableDice : ['d4', 'd6', 'd8', 'd10', 'd12', 'd20'],
      number: ['1','2','3','4','5','6','7','8'],
      selected: 'd4',
      diceNumber: 1,
      rolls: [],
      total: 0,
    };
    this.diceSelect = this.diceSelect.bind(this);
    this.roll = this.roll.bind(this);
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

  diceSelect = (e) => {
    let dice = e.target.getAttribute('name')
    // let message = this.props.thisPlayer + ` rolls (${dice}): ` + this.roll(dice).total;
    let message = this.props.thisPlayer + ` rolls (${dice}): ` + importRoll(dice).total;
    
    let obj = {
      speaker: 'status',
      msg: message,
    };

    this.props.sendChat(obj);
    this.props.closeMenu();
  }

  render () {
    let contextMenuDice = this.state.availableDice.map((dice, i) => 
      <div className="contextmenu-option" name={dice} key={i}>{dice}
        <div className="submenu">
          {this.state.number.map((number, j) => <div className="sub-option" name={number+dice} key={j} onClick={this.diceSelect}>{number}</div>)}
        </div>
      </div>
    );

     return (
      <div className="contextmenu-container">
        <div className='contextmenu-header'>
          Rolls
        </div>
        {contextMenuDice}
      </div>
      );
  }
}

export default DiceRollContextMenu;