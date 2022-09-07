import React from 'react';

class DiceRoll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      availableDice : ['d4', 'd6', 'd8', 'd10', 'd12', 'd20'],
      selected: 'd4',
      diceNumber: 1,
      rolls: [],
      total: 0,
    };
    this.diceSelect = this.diceSelect.bind(this);
    this.roll = this.roll.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
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
    this.setState({selected: e.target.getAttribute('name')});
  }

  clickHandler = () => {
    let diceString = this.state.diceNumber.toString() + this.state.selected;
    console.log('diceString: ', diceString);

    let result = this.roll(diceString);
    this.setState({
                    rolls: result.rolls,
                    total: result.total,
                  });
  }

  changeHandler = (e) => {
    this.setState({diceNumber: e.target.value})
  }

  render () {
    let diceSelection = this.state.availableDice.map((element, key) => {
      if (element === this.state.selected) 
        return <div name={element} className="dice-selected" onClick={this.diceSelect} key={key}>{element}</div> 
      return <div name={element} className="dice" onClick={this.diceSelect} key={key}>{element}</div>
    });

    let diceRolled = this.state.rolls.map((element, key) => {

      /*style={{animationDelay: `${key}s`*/

      return (
        <div className='dice-rolled-flipbox'>
          <div className='dice-rolled-inner'>
            <div className="dice-rolled-front">{element}</div>
            <div className="dice-rolled-back">{this.state.selected}</div>
          </div>
        </div>
      );
    });



    return (
      <div className="DMCalc-item">
        <div className="calc-header">Roll Dice</div>
       
        <div className='row-container'>
          <div className="diceNumHeader"># dice:<input id="diceNumber" type="text" name="diceNumber" onChange={this.changeHandler} value={this.state.diceNumber}></input> </div>    
          {diceSelection}
        </div>
        <div className='dice-roll-region'> 
               
          {diceRolled}
          <div> = {this.state.total}</div>  
        </div>

        <button className=".login-button" onClick={this.clickHandler}>Roll Dice</button>
      </div>
    )

  }

  
}

export default DiceRoll;