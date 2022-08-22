import React from 'react';
import PartyList from './partylist';
import Combat from './combat.jsx';
import adventurerList from '../../test/players.js';
import enemyList from '../../test/enemies.js';
import CombatLogEntry from './combatlog';

//master component which wraps all components with CSS grid

class ActiveGUI extends React.Component {

  constructor(props) {
    super(props);
  
    this.attack = this.attack.bind(this);
    this.rollInitiative = this.rollInitiative.bind(this);
    this.roll = this.roll.bind(this);
    this.state = {
      adventurerList : adventurerList,
      enemyList : enemyList,
      turn: 0,
      activePlayer: 0,
      combatLog : [{msg: 'Combat Log:'}],
    };

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

  rollInitiative = () => {
    var newList = this.state.adventurerList;

    for (var i = 0; i < this.state.adventurerList.length; i++) {
      let initRoll = this.roll('1d20').total;
      console.log(`${this.state.adventurerList[i].name} rolled a ${initRoll}`);
      newList[i].initiative = initRoll;
    }

    console.log('done adding changes to init'); 
    newList.forEach(item => console.log(`${item.name} : ${item.initiative}`));
    newList.sort((a,b) => b.initiative - a.initiative);
    console.log('sorted');
    newList.forEach(item => console.log(`${item.name} : ${item.initiative}`));
    this.setState({ adventurerList:newList });
  }

  componentDidMount () {

    this.rollInitiative();

    socket.on('attack', (message) => { 
      //var socketMSG = document.createElement('li');
      //socketMSG.innerHTML = 'attack message received from server CDM';
      //document.getElementById('chatlog').appendChild(socketMSG);

      let combatLog = [...this.state.combatLog];

      combatLog.push({msg: `${message.attacker} has attacked! ... ${message.dmg} damage dealt!  `});
      this.setState({ combatLog });
    });
  }

  attack = () => {



    socket.emit('attack', {
      attacker: this.state.adventurerList[this.state.activePlayer].name,
      dmg: this.roll(this.state.adventurerList[this.state.activePlayer].weapon[1]).total,
    });

    if (this.state.activePlayer >= this.state.adventurerList.length - 1) {
      console.log(`current player number: ${this.state.activePlayer + 1} / ${this.state.adventurerList.length}`);
      this.setState({activePlayer: 0});
    } else {
      console.log(`current player number: ${this.state.activePlayer + 1} / ${this.state.adventurerList.length}`);
      this.setState({activePlayer: this.state.activePlayer + 1});
    }
  }

  render () {
    return (

      <div class="grid-container">
        <div class="item1">
          <h1>Turn: {this.state.adventurerList[this.state.activePlayer].name}</h1>
        </div>
        <div class="item2">
          menu
          <PartyList adventurerList={this.state.enemyList}/>

        </div>
        <div class="item3">
          
            {this.state.combatLog.map( (combatLogEntry, index) => {
                return (
                  <CombatLogEntry key={index} message={combatLogEntry.msg}/>)          
              })}
        </div>  
        <div class="item4"> 
          <table>
            <tbody>
              <tr colSpan="2">Midir's Minions</tr>  
              <PartyList adventurerList={this.state.adventurerList}/>
            </tbody>
          </table>
        </div>
        <div class="item5">
          <div id="footer">
            
            {/* <Combat attack={this.attack}/> */}
          </div>

          <div class="action-menu">
            <div class="option" onClick={this.attack}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
               Attack
            </div>
            <div class="option">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            Action
            </div>
            <div class="option">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            Bonus Action
            </div>
            <div class="option">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            Run
            </div>
          </div>
          
        </div>
      </div>




    );
  }

}

export default ActiveGUI;