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
    this.rollInitiativeParty = this.rollInitiativeParty.bind(this);
    this.roll = this.roll.bind(this);
    this.state = {
      adventurerList : adventurerList,
      enemyList : enemyList,
      turn: 0,
      activePlayer: 0,
      combatLog : [{msg: 'Combat Log:'}],
      headlineMessage: '',
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

  rollInitiativeEnemy = () => {
    var newList = this.state.enemyList;
    for (var i = 0; i < this.state.enemyList.length; i++) {
      let initRoll = this.roll('1d20').total;
      newList[i].initiative = initRoll;
    }
    newList.sort((a,b) => b.initiative - a.initiative);
    this.setState({ enemyList:newList });
  }

  rollInitiativeParty = () => {
    var newList = this.state.adventurerList;
    for (var i = 0; i < this.state.adventurerList.length; i++) {
      let initRoll = this.roll('1d20').total;
      newList[i].initiative = initRoll;
    }
    newList.sort((a,b) => b.initiative - a.initiative);
    this.setState({ adventurerList:newList });
  }

  componentDidMount () {

    this.rollInitiativeParty();
    this.rollInitiativeEnemy();

    socket.on('attack', (message) => { 
      //var socketMSG = document.createElement('li');
      //socketMSG.innerHTML = 'attack message received from server CDM';
      //document.getElementById('chatlog').appendChild(socketMSG);

      let combatLog = [...this.state.combatLog];

      combatLog.push({msg: `${message.attacker} deals ${message.dmg} damage!  `});
      this.setState({ combatLog });

      //see if we can deduct dmg.
      let enemyList = [...this.state.enemyList];
      enemyList[0].hp[0] -= message.dmg;
      this.setState({ enemyList});

      if (enemyList[0].hp[0] <= 0) {
        let deadMSG = [...this.state.combatLog];
        deadMSG.push({msg: `${this.state.enemyList[0].name} is defeated! `});
        enemyList.shift();

        this.setState({ combatLog: deadMSG,
                        enemyList: enemyList,
                   });

      }
      
    });
  }


  attack = () => {

    let activeName = this.state.adventurerList[this.state.activePlayer].name;
    console.log(`attacking ${this.state.enemyList[0].name} `);
    let nextMessage = `${activeName} attacks ${this.state.enemyList[0].name} `;

    let combatLog = [...this.state.combatLog];
    combatLog.push({msg: nextMessage});
    this.setState({ combatLog });

    //comparing AC
    let attackRoll = this.roll('1d20').total;
    let ac = this.state.enemyList[0].armor_class[1];

    if (attackRoll >= ac) {
      nextMessage = `attack hits! player attack roll:${attackRoll} vs enemy AC:${ac}`;
      socket.emit('attack', {
        target: this.state.enemyList[0].name,
        attacker: this.state.adventurerList[this.state.activePlayer].name,
        dmg: this.roll(this.state.adventurerList[this.state.activePlayer].weapon[1]).total,
      });

    } else {
      nextMessage = `attack misses! player attack roll:${attackRoll} vs enemy AC:${ac}`;
    }

    //publishing the second message
    combatLog = [...this.state.combatLog];
    combatLog.push({msg: nextMessage});
    this.setState({ combatLog });




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
          <h3>{}</h3>
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
          <Combat attack={this.attack}/>
            {/* <Combat attack={this.attack}/> */}
          </div>
          
        </div>
      </div>




    );
  }

}

export default ActiveGUI;