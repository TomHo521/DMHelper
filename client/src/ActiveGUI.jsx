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
    this.proficiencyBonus = this.proficiencyBonus.bind(this);
    this.modifiers = this.modifiers.bind(this);
    this.logNext = this.logNext.bind(this);
    this.initializeTurnList = this.initializeTurnList.bind(this);
    this.determineNextPlayer = this.determineNextPlayer.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.enemyAttack = this.enemyAttack.bind(this);

    this.state = {
      adventurerList : adventurerList,
      enemyList : enemyList,
      turn: 0,
      activePlayer: 0,
      activeEnemy: 0,
      combatLog : [{msg: 'Combat Log:'}],
      headlineMessage: '',
      turnList: [],
      turnPlayer: {},
      value: '',
    };
  }

  proficiencyBonus = (level) => {
    return Math.floor((2 + (level - 1))/4);
  }

  modifiers = (stat) => {
    return Math.floor((stat - 10)/2);
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
      newList[i].type = 'enemy';
    }
    newList.sort((a,b) => b.initiative - a.initiative);
    this.setState({ enemyList:newList });
  }

  rollInitiativeParty = () => {
    var newList = this.state.adventurerList;
    for (var i = 0; i < this.state.adventurerList.length; i++) {
      let initRoll = this.roll('1d20').total;
      newList[i].initiative = initRoll;
      newList[i].type = 'player';
    }
    newList.sort((a,b) => b.initiative - a.initiative);
    this.setState({ adventurerList:newList });
  }

  enemyAttack = () => {
    //enemy should select a target. 
    let enemyTarget = Math.floor(Math.random() * this.state.adventurerList.length);

    let targetPlayer = this.state.adventurerList[enemyTarget];
    let activeEnemy = this.state.enemyList[this.state.activeEnemy];
    let nextMessage = `${activeEnemy.name} attacks ${targetPlayer.name} `;
    this.logNext(nextMessage);

    //compute the data!
    let attackRoll = this.roll('1d20').total;
    let pB = this.proficiencyBonus(activeEnemy.level);
    let dexMod = this.modifiers(activeEnemy.stats.dex);
    let ac = targetPlayer.armor_class[1];
    let dmgRoll = this.roll(activeEnemy.weapon[1]).total;

    if ((attackRoll + pB + dexMod) >= ac) {
      nextMessage = `Attack hits!   Roll: ${attackRoll} +${pB}pb +${dexMod}dex Mod vs player AC:${ac}`;
      socket.emit('attack', {
        target: targetPlayer.name,
        attacker: activeEnemy.name,
        dmg: dmgRoll,
      });
    } else {
      nextMessage = `${activeName}'s attack misses!   Roll: ${attackRoll} +${pB}pb +${dexMod}dex Mod vs enemy AC:${ac}`;
    }
    
    this.logNext(nextMessage);
  }

  determineNextPlayer = () => {
    let turnList = this.state.turnList;

    if (turnList.length === 0) {
      this.initializeTurnList();
    }
    let nextPlayer = turnList.shift();
    this.setState({turnList});

    return nextPlayer;
  }

  initializeTurnList = () => {
    let turnList = this.state.adventurerList;
    turnList = turnList.concat(this.state.enemyList);
    turnList.sort((a,b) => b.initiative - a.initiative);
    this.setState({ turnList });
  }

  logNext = (message) => { // message should be of type string
    let combatLog = [...this.state.combatLog];
    combatLog.push({msg: message});
    this.setState({ combatLog });
  }

  componentDidMount () {

    this.rollInitiativeParty();
    this.rollInitiativeEnemy();
    this.initializeTurnList();

    // waiting for when the turnList is populated
    if (this.state.turnList.length !== 0) {
      let nextPlayer = this.determineNextPlayer();
      while ((nextPlayer.type === 'enemy') && (nextPlayer)) {
        this.enemyAttack();
        nextPlayer = this.determineNextPlayer();
      }
    }

    socket.on('chat', msg => this.logNext(msg));
    
    socket.on('attack', (msg) => { 
      this.logNext(`${msg.attacker} deals ${msg.dmg} damage to ${msg.targetName}!  `);
      let target = parseInt(msg.target);

      let enemyList = [...this.state.enemyList];  //deduct damage
      enemyList[target].hp[0] -= msg.dmg;
      this.setState({ enemyList});

      if (enemyList[target].hp[0] <= 0) {
        this.logNext(`${enemyList[target].name} is defeated! `);
        enemyList.shift();
        this.setState({ enemyList: enemyList});
      }
    });

    socket.on('enemyStrike', (msg) => {

    });
  }

  attack = () => {

    let activeP = this.state.adventurerList[this.state.activePlayer];
    let activeName = this.state.adventurerList[this.state.activePlayer].name;
    let nextMessage = `${activeName} attacks ${this.state.enemyList[0].name} `;

    this.logNext(nextMessage);

    //comparing AC
    let attackRoll = this.roll('1d20').total;
    let pB = this.proficiencyBonus(activeP.level);
    let dexMod = this.modifiers(activeP.stats.dex);
    let ac = this.state.enemyList[0].armor_class[1];
    let dmgRoll = this.roll(this.state.adventurerList[this.state.activePlayer].weapon[1]).total;

    if ((attackRoll + pB + dexMod) >= ac) {
      nextMessage = `${activeName}'s attack hits!   Roll: ${attackRoll} +${pB}pb +${dexMod}dex Mod vs enemy AC:${ac}`;
      socket.emit('attack', {
        targetName: this.state.enemyList[0].name,
        attacker: this.state.adventurerList[this.state.activePlayer].name,
        dmg: dmgRoll,
        target: 0,
      });
    } else {
      nextMessage = `${activeName}'s attack misses!   Roll: ${attackRoll} +${pB}pb +${dexMod}dex Mod vs enemy AC:${ac}`;
    }

    //publishing the second message
    this.logNext(nextMessage);

    if (this.state.activePlayer >= this.state.adventurerList.length - 1) {
      this.setState({activePlayer: 0});
    } else {
      this.setState({activePlayer: this.state.activePlayer + 1});
    }
  }

  handleChange (e) {
    const value = e.target.value;

    this.setState({value});
    //}
    // const name = e.target.name;
    // this.setState({ [name]: value });
    
  }

  handleKeyPress (e) {
   if (e.key === "Enter") {
       socket.emit('chat', `This player says:  ${this.state.value}`);
       this.setState({value: ''});
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
          Enemy:
          <PartyList adventurerList={this.state.enemyList}/>
        </div>
        <div class="item3">
            {this.state.combatLog.map( (combatLogEntry, index) => {
                return (
                  <CombatLogEntry key={index} message={combatLogEntry.msg}/>)          
              })}
              
        </div>  
        <div class="item6">
          <input type="text" onKeyPress={this.handleKeyPress} onChange={this.handleChange} value={this.state.value}></input>
        </div>
        <div class="item4"> 
          <table>
            <tbody>
              <tr colSpan="2">Midir's Minions</tr>  
              <PartyList adventurerList={this.state.adventurerList} activePlayer={this.state.activePlayer}/>
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