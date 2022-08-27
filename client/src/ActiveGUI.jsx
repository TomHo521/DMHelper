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
    this.roll = this.roll.bind(this);
    this.proficiencyBonus = this.proficiencyBonus.bind(this);
    this.modifiers = this.modifiers.bind(this);
    this.logNext = this.logNext.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    
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
      chatBox: '',
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



  logNext = (message) => { // message should be of type string
    let combatLog = [...this.state.combatLog];
    combatLog.push({msg: message});
    this.setState({ combatLog });
  }


  componentDidMount () {
    socket.on('initRollDone' , msg => {

      this.logNext('All Players have completed their rolls')
      this.setState({
        enemyList: msg.enemyList,
        adventurerList: msg.adventurerList,
      });
      
    });

    socket.on('enemyAttack', msg => {
      setInterval(this.logNext('the enemy is gathering strength...'), 500);
      setInterval(this.logNext(`the enemy Attacks!`), 2500);
    });
    
    socket.on('chat', msg => this.logNext(msg));
  
    //upon receiving the attack message from server client does computations
    socket.on('attack-reply', (msg) => { 
      this.logNext(msg.msg);

      this.setState({
        enemyList: msg.mTL.enemyList,
        adventurerList: msg.mTL.adventurerList,
      });

      console.log(`adventurerList ${msg.adventurerList}`)

    });

  }

  attack = () => {

    //for now we assume the target is always 0;
    let activeP = this.state.adventurerList[this.state.activePlayer];
    let activeName = this.state.adventurerList[this.state.activePlayer].name;
    let nextMessage = `${activeName} attacks ${this.state.enemyList[0].name}!!!     ` ;

    //comparing AC
    let attackRoll = this.roll('1d20').total;
    let pB = this.proficiencyBonus(activeP.level);
    let dexMod = this.modifiers(activeP.stats.dex);
    let ac = this.state.enemyList[0].armor_class[1];
    var dmgRoll = 0;
    

    if ((attackRoll + pB + dexMod) >= ac) {
      nextMessage += `${activeName}'s attack hits!   Roll: ${attackRoll} +${pB}pb +${dexMod}dex Mod vs enemy AC:${ac}`;
      dmgRoll = this.roll(this.state.adventurerList[this.state.activePlayer].weapon[1]).total;
    } else {
      nextMessage += `${activeName}'s attack misses!   Roll: ${attackRoll} +${pB}pb +${dexMod}dex Mod vs enemy AC:${ac}`;
    }

    //after performing relevant computations, upload to server
    socket.emit('attack', {
      targetName: this.state.enemyList[0].name,
      attacker: this.state.adventurerList[this.state.activePlayer].name,
      dmg: dmgRoll,
      target: 0,
      msg: nextMessage,
    });

    if (this.state.activePlayer >= this.state.adventurerList.length - 1) {
      this.setState({activePlayer: 0});
    } else {
      this.setState({activePlayer: this.state.activePlayer + 1});
    }

  }

  handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({ [name]: value });
  }

  handleKeyPress = (e) => {
   if (e.key === "Enter") {
       console.log(`formerly login: ${this.props.thisPlayer}`)
       socket.emit('chat', `${this.props.thisPlayer}: ${this.state.chatBox}`);
       this.setState({chatBox: ''});
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
          <button onClick={this.props.openModal}>Engage Initiative</button>
          {/* <button onClick={this.handleClickRoll}>Roll Intiative</button> <input type="text" name="character" onChange={this.handleChange} value={this.state.character}></input> */}
          <br></br>
          <input type="text" name="chatBox" onKeyPress={this.handleKeyPress} onChange={this.handleChange} value={this.state.chatBox}></input>
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
          </div>
        </div>
      </div>
    );
  }
}

export default ActiveGUI;

/*

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
  }*/