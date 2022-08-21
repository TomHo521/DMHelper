import React from 'react';
import enemy from '../../test/enemies.js';
import player from '../../test/players.js';

//const socket = io('ws://localhost:3000');

class Combat extends React.Component {
  constructor(props) {
    super(props);
    
    this.attack = this.attack.bind(this);
    this.rollDice = this.rollDice.bind(this);
    this.enemyAttack = this.enemyAttack.bind(this);
    this.rollInitiative = this.rollInitiative.bind(this);

    this.state = {
      "enemy" : enemy,
      "player" : player,
      "turn": 0,
      "combatLog" : [{msg: 'first entry'}],
    };
  }

  componentDidMount() {

    socket.on('attack', (message) => { 
      console.log('attack message received from server CDM');
      //var socketMSG = document.createElement('li');
      //socketMSG.innerHTML = 'attack message received from server CDM';
      //document.getElementById('chatlog').appendChild(socketMSG);

      let combatLog = [...this.state.combatLog];

      combatLog.push({msg: 'attack message received from server CDM'});
      this.setState({ combatLog });
    });

  }

  componentDidUpdate() {

  }


  enemyAttack = () => {

  }

  rollInitiative = () => {
    let combatLog = [...this.state.combatLog];
    combatLog.push({msg: 'roll Initiative!  dex check'});
    this.setState({ combatLog });
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


  attack = () => {

    // console.log('attack button pressed!!');
    socket.emit('attack', `client side attck button socket.emit`);

  }

  render() {

    return ( <div>

        <button onClick={this.attack}>Attack</button> 
        <button onClick={this.rollDice}>Roll Dice</button>
        <br></br>
        <ul>
          {this.state.combatLog.map( (combatLogEntry, index) => {
            console.log(combatLogEntry);
            return (
              <li key={index}>{combatLogEntry.msg}</li>)          
        })}
        </ul>


      </div>
    );
  }
}

export default Combat;
