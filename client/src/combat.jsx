import React from 'react';

//const socket = io('ws://localhost:3000');

class Combat extends React.Component {
  constructor(props) {
    super(props);
    
    this.attack = this.attack.bind(this);
    this.rollDice = this.rollDice.bind(this);
  
  }

  componentDidMount() {

  }


  rollDice = () => {

    var dice = '6d6';
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
    

    console.log('the number of dice ', qty);
    console.log('d:', diceType);

    console.log(`your rolls were: `);
    for (var j = 0; j < rolls.length; j++) {
      console.log(`roll ${j+1}: ${rolls[j]}`);
    }

    return {
      total: total,
      rolls: rolls,
    }
  }


  render() {

    return ( <div>

        <button onClick={this.props.attack}>Attack</button> 
        <button onClick={this.rollDice}>Roll Dice</button>
        <br></br>  
   
      </div>
    );
  }
}

export default Combat;
