import React from 'react';
import enemy from '../test/enemies.js';
import player from '../test/players.js';

//const socket = io('ws://localhost:3000');

class Combat extends React.Component {
  constructor(props) {
    super(props);
    
    this.attack = this.attack.bind(this);
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

    // socket.on('attack', (message) => { 
    //   console.log('attack message received from server CDM');
    //   document.getElementById('chatlog').appendChild(<li>attack message received from server</li>);
    // });

  }

  componentDidUpdate() {
    // socket.on('attack', (message) => { 

    //   console.log('attack message received from server CDU');
    //   document.getElementById('chatlog').appendChild(<li>attack message received from server</li>);
    // });

  }


  enemyAttack = () => {

  }

  rollInitiative = () => {
    let combatLog = [...this.state.combatLog];
    combatLog.push({msg: 'roll Initiative!  dex check'});
    this.setState({ combatLog });
  }


  attack = () => {

    // console.log('attack button pressed!!');
    // socket.emit('attack', `client side attck button socket.emit`);
    let combatLog = [...this.state.combatLog];

    combatLog.push({msg: 'client side attack button'});
    this.setState({ combatLog });
  }

  render() {

    return ( <div>

        <button onClick={this.attack}>Attack</button> 
        <br></br>
        {this.state.combatLog.map( (combatLogEntry, index) => {
          console.log(combatLogEntry);
          return (<div key={index} class="w3-container">
            <h5 class="w3-opacity"><b>⚔ You Chose Attack!</b></h5>
            <h6 class="w3-text-teal"><i class="fa fa-calendar fa-fw w3-margin-right"></i>Mar 2012 - Dec 2014</h6>
            <p>{combatLogEntry.msg}</p>
            <hr></hr>
          </div>)
          
        })}

      </div>
    );
  }
}

export default Combat;
