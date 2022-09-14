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
    this.getTarget = this.getTarget.bind(this);
    this.getIndexOf = this.getIndexOf.bind(this);
    this.sendAttack = this.sendAttack.bind(this);
    this.rightClick = this.rightClick.bind(this);
    this.updateUI = this.updateUI.bind(this);

    this.state = {
      adventurerList : adventurerList,
      enemyList : enemyList,
      turn: 0,
      activeEntity: 'Combat not ready yet',
      thisPlayerObj: {},
      activeEnemy: 0,
      combatLog : [{msg: 'Combat Log:'}],
      headlineMessage: '',
      turnList: [],
      turnPlayer: {},
      acquiringTarget: false,
      everyonesTargets: {},
      chatBox: '',
      currentlyOnline: {},
      showOnline: true,
      culledList: [],
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

  updateUI = () => {
    socket.emit('getStatus', {thisPlayer: this.props.thisPlayer});
  }

  componentDidMount () {

    socket.emit('getStatus', {thisPlayer: this.props.thisPlayer});
    socket.emit('chat', `${this.props.thisPlayer} has come online`);

    socket.on('getStatus', msg => {
      if (msg.thisPlayerObj.name === this.props.thisPlayer) {
        this.setState({
          thisPlayerObj: msg.thisPlayerObj
        });
      }
      this.setState({
        enemyList: msg.enemyList,
        adventurerList: msg.adventurerList,
        activeEntity: msg.activeEntity,
        currentlyOnline: msg.currentlyOnline,
        culledList: msg.culledList,
      });

      console.log('culled List received from ther server ', msg.culledList);

    })


    socket.on('initRollDone' , msg => {
      let turnCounter = msg.currentTurn

      updateUI();

      this.logNext(`All Players have completed their rolls: turn: ${turnCounter}`)
      this.setState({
        enemyList: msg.enemyList,
        adventurerList: msg.adventurerList,
        activeEntity: msg.activeEntity,
      });
      
      this.logNext(`now ${this.adventurerList[turnCounter].name}'s turn`);
    });

    socket.on('enemyAttack', msg => {

      msg.msgLog.forEach(e => this.logNext(e));

      console.log('data from enemy attack msg ', msg.activeEntity);
      this.setState({
        enemyList: msg.mTL.enemyList,
        adventurerList: msg.mTL.adventurerList,
        activeEntity: msg.activeEntity,
      });

      socket.emit('getStatus', {thisPlayer: this.props.thisPlayer});
      
    });
    
    socket.on('chat', msg => this.logNext(msg));
  
    //upon receiving the attack message from server client does computations
    socket.on('attack-reply', (msg) => { 
      this.logNext(msg.msg);
      this.setState({
        enemyList: msg.mTL.enemyList,
        adventurerList: msg.mTL.adventurerList,
        activeEntity: msg.activeEntity,
      });
    });

    socket.on('playerdc', (msg) => {
      this.logNext(msg.msg);
      this.setState({
        currentlyOnline: msg.currentlyOnline,
        culledList: msg.culledList,
      });
    });
  }

  sendAttack = (target) => {

        //for now we assume the target is always 0;
        let activeP = this.state.thisPlayerObj;
        let activeName = this.state.thisPlayerObj.name;
    
        let nextMessage = `${activeName} attacks ${this.state.enemyList[target].name}!!!     ` ;
    
        //comparing AC
        let attackRoll = this.roll('1d20').total;
        let pB = this.proficiencyBonus(activeP.level);
        let dexMod = this.modifiers(activeP.stats.dex);
        let ac = this.state.enemyList[target].armor_class[1];
        var dmgRoll = 0;
    
        if ((attackRoll + pB + dexMod) >= ac) {
          if (attackRoll === 20) {
            let dice = activeP.weapon[1];
            dice[0] = 2;
            dmgRoll = this.roll(dice).total + dexMod;
          } else {
            dmgRoll = this.roll(activeP.weapon[1]).total + dexMod;
          }
          
          nextMessage += `${activeName}'s attack hits!   Roll: ${attackRoll} +${pB}pb +${dexMod}dex Mod vs enemy AC:${ac}, ${dmgRoll} damage dealt!`;
        } else {
          nextMessage += `${activeName}'s attack misses!   Roll: ${attackRoll} +${pB}pb +${dexMod}dex Mod vs enemy AC:${ac}, ${dmgRoll} damage dealt!`;
        }
    
        //after performing relevant computations, upload to server
        this.setState({acquiringTarget : false});
        socket.emit('attack', {
          targetName: this.state.enemyList[target].name,
          attacker: this.props.thisPlayer,
          dmg: dmgRoll,
          target: target,
          msg: nextMessage,
        });
  }

  getTarget = (e) => {
    if (this.state.acquiringTarget) {
      let index = this.getIndexOf(e.currentTarget.id, this.state.enemyList);
      console.log('index acquired was: ', index);
      this.sendAttack(index);
    }
    this.logNext(`${e.currentTarget.id}'s icon was clicked`);
  }

  getIndexOf = (name, array) => {
    for (var i = 0; i < array.length; i++) {
      if (array[i].name === name) {
        return i;
      }
    }
    return -1;
  }

  attack = () => {
    // need to acquire target
    if (this.props.thisPlayer === this.state.activeEntity) {
      // attack was clicked AND it is this players turn.
      this.logNext(`${this.props.thisPlayer} is selecting their target`);
      this.setState({ acquiringTarget: true });
    } else {
      this.logNext('Please wait your turn');
    }
  }

  handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({ [name]: value });
  }

  handleKeyPress = (e) => {
   if (e.key === "Enter") {
       socket.emit('chat', `${this.props.thisPlayer}: ${this.state.chatBox}`);
       this.setState({chatBox: ''});
    }
  }
  
  rightClick = (e) => {
    e.preventDefault();

    console.log(' e.type', e);

    if (e.type === 'contextmenu') {
      this.setState({showOnline: !this.state.showOnline});
     
      console.log('right mouse button clicked!');
    } else {

      console.log('left mouse button clicked!');

    }

  }

  render () {
    let currentlyOnline = (this.state.showOnline)? Object.keys(this.state.currentlyOnline).map(element => <div>{element.slice(0,8)}</div>) : null;


    return (
      <div class="grid-container">
        <div class="item1" id="item1override">
          <p id="currentlyOnline" onContextMenu={this.rightClick} onClick={this.rightClick}>Currently Online: {currentlyOnline} </p>
          <p id='loggedInPlayer' onClick={this.props.openAdventurerProfileModal}>Logged in as:
           <br></br> {this.props.thisPlayer}
          </p>
          <p id="DMCalcLink" onClick={this.props.openDMCalcModal}>
            DM calc
          </p>
          <h1>Turn: {this.state.activeEntity}</h1>
          <h3>{}</h3>
        </div>
        <div class="item2">
          Enemy:
          <PartyList acquiringTarget={this.state.acquiringTarget} getTarget={this.getTarget} adventurerList={this.state.enemyList} activeEntity={this.state.activeEntity}/>
          <button onClick={this.props.openModal}>Roll Initiative</button>
        </div>
        <div class="item3" id="chatWindow">
            {this.state.combatLog.map( (combatLogEntry, index) => {
                return (
                  <CombatLogEntry key={index} message={combatLogEntry.msg}/>)          
              })}
              
        </div>  
        <div class="item6">
          <input type="text" name="chatBox" className='chatbox' onKeyPress={this.handleKeyPress} onChange={this.handleChange} value={this.state.chatBox}></input>
        </div>
        <div class="item4"> 
          Party:
          <PartyList acquiringTarget={this.state.acquiringTarget} getTarget={this.getTarget} adventurerList={this.state.culledList} activeEntity={this.state.activeEntity}/> 
        </div>
        <div class="item5">
          <div id="footer">
            <Combat attack={this.attack} openMagicModal={this.props.openMagicModal} closeMagicModal={this.props.closeMagicModal}/>
          </div>
        </div>
      </div>
    );
  }
}

export default ActiveGUI;  