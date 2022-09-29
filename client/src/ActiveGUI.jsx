import React from 'react';
import PartyList from './partylist';
import CombatMenu from './CombatMenu';
import adventurerList from '../../test/players.js';
import enemyList from '../../test/enemies.js';
import MagicMenu from './Menus/magicmenu';
import InitiativeCheck from './InitiativeCheck';
import ContextMenu from './Menus/contextmenu';
import ChatWindow from './chatWindow/ChatWIndow';


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
    this.currentlyOnlineHandler = this.currentlyOnlineHandler.bind(this);
    this.updateUI = this.updateUI.bind(this);

    this.openMagicModal = this.openMagicModal.bind(this);
    this.closeMagicModal = this.closeMagicModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.setAcquiringTarget = this.setAcquiringTarget.bind(this);
    this.sendMagicAttack = this.sendMagicAttack.bind(this);
    this.updateState = this.updateState.bind(this);
   
    this.sendChat = this.sendChat.bind(this);
    

    this.state = {
      adventurerList : adventurerList,
      enemyList : enemyList,
      turn: 0,
      activeEntity: 'Combat not ready yet',
      thisPlayerObj: {},
      combatLog : [{msg: 'Combat Log:'}],
      statusLog: [{msg: 'Activity Log:'}],
      // activeChat: 'tb3',
      privateMessage: {
                'tb3': {
                  participants: {
                    'Midir': 'socket id of Midir',
                    'Lia:' : 'socket id of Lia',
                    'Perg' : 'socket id of Perg'
                  },
                  name: 'tb2',
                  log: [{speaker: 'title', msg: 'Lia and Midir Conversation'}, {speaker: 'Lia', msg: 'blah blah blah'}, {speaker: 'Midir', msg: 'beh de beh'}]
                },
                'tb4':{
                  participants: {
                  'Midir': 'socket id of Midir',
                  'Cassian:' : 'socket id of Lia',
                  },
                  name: 'tb3',
                  log: [{speaker: 'title', msg: 'Midir and Cassian Conversation'}, {speaker: 'Cassian', msg: 'blah blah blah'}, {speaker: 'Midir', msg: 'beh de beh'}]
                },
      },
      turnList: [],
      acquiringTarget: false,
      chatBox: '',
      currentlyOnline: {},
      showOnline: true,
      culledList: [],
      initiativeList: {'Midir':45, 'Lia':0, 'Zovinar':0, 'Po':0, 'Cassian':0, 'Pergilius von Waxilium':0,}
    };
  }

  openModal = () => {
    let modal = document.getElementById("initWindow");
    modal.style.display = "block";
  }

  closeModal = () => {
    let modal = document.getElementById("initWindow");
    modal.style.display = "none";
  }



  openMagicModal = () => {
    let modal = document.getElementById("magicWindow");
    modal.style.display = "block";
  }

  closeMagicModal = () => {
    let modal = document.getElementById("magicWindow");
    modal.style.display = "none"; 
  }

  proficiencyBonus = (level) => Math.floor((2 + (level - 1))/4);
  modifiers = (stat) => Math.floor((stat - 10)/2);
  
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

  updateState = (stateObj) => {
    this.setState({
      enemyList: (stateObj.enemyList)? stateObj.enemyList: this.state.enemyList,
      adventurerList: (stateObj.adventurerList)? stateObj.adventurerList: this.state.adventurerList,
      activeEntity: (stateObj.activeEntity) ? stateObj.activeEntity : this.state.activeEntity,
      currentlyOnline: (stateObj.currentlyOnline) ? stateObj.currentlyOnline: this.state.currentlyOnline,
      culledList: (stateObj.culledList)? stateObj.culledList: this.state.culledList,
      initiativeList: (stateObj.initiativeList)? stateObj.initiativeList: this.state.initiativeList
    });
  }

  sendChat = (obj) => {
    socket.emit('chat', obj);
  }

  componentDidMount () {

    socket.emit('getStatus', {thisPlayer: this.props.thisPlayer});
    // socket.emit('chat', `${this.props.thisPlayer} has come online`);
    socket.emit('chat', {
      speaker: 'status',
      msg: `${this.props.thisPlayer} has come online`,
    });

    socket.on('getStatus', msg => {
      if (msg.thisPlayerObj.name === this.props.thisPlayer) {
        this.setState({
          thisPlayerObj: msg.thisPlayerObj
        });
      }

      this.updateState(msg);
    })

    socket.on('initRollDone' , msg => {
      let turnCounter = msg.currentTurn
      this.updateUI();
      this.logNext(`All Players have completed their rolls: turn: ${turnCounter}`)      
      this.logNext(`now ${this.adventurerList[turnCounter].name}'s turn`);
    });

    socket.on('enemyAttack', msg => {
      msg.msgLog.forEach(e => this.logNext(e));
      this.updateUI();
    });
    
    socket.on('chat', msg => {
      let statusCheck = (msg.speaker === 'status')? '' : `${msg.speaker}: `;
      this.logNext(`${statusCheck} ${msg.msg}`)
    });
  
    //upon receiving the attack message from server client does computations
    socket.on('attack-reply', (msg) => { 
      this.logNext(msg.msg);
      this.updateState(msg);
    });

    socket.on('playerdc', (msg) => {
      this.logNext(msg.msg);
      this.updateState(msg);
    });

    socket.on('pm', (msg) => {
      this.logNext(msg.chatObj);
      
      if (msg.roomID in this.state.privateMessage) {
        // let newObj = this.state.privateMessage[msg.roomID];
        // newObj.log.push(msg.chatObj);
        let newLogObj = this.state.privateMessage[msg.roomID];
        newLogObj.push(msg.chatObj);

        this.setState(prevState => ({
          privateMessage: {
            ...prevState.privateMessage,
            [msg.roomID]:{
              ...prevState.privateMessage[msg.roomID],
              log: newLogObj,
            }
          }
        }));

      } else {

        this.setState(prevState => ({
          privateMessage: {
            ...prevState.privateMessage,
            [msg.roomID]: msg.chatObj,
          }
        })); 
      }
    })
  }

  sendAttack = (target) => {
    let activeP = this.state.thisPlayerObj;
    let activeName = this.state.thisPlayerObj.name;
    let nextMessage = `${activeName} attacks ${this.state.enemyList[target].name}!!!     ` ;

    //comparing AC
    let attackRoll = this.roll('1d20').total;
    let pB = this.proficiencyBonus(activeP.level);



    let dexMod = this.modifiers(activeP.stats.dex);
    let ac = this.state.enemyList[target].armor_class[1];
    var dmgRoll = 0;

    let critical = '';
    let modMessage = `+ ${dexMod} (dex) `;

    if (((attackRoll + pB + dexMod >= ac) || (attackRoll === 20)) && (attackRoll !== 1)) {
      if (attackRoll === 20) {
        let dice = activeP.weapon[1];
        dice[0] = 2;
        dmgRoll = this.roll(dice).total + dexMod;
        critical = 'Critical Hit! 2x dmg dice!'
      } else {
        dmgRoll = this.roll(activeP.weapon[1]).total + dexMod;
      }
      
      nextMessage += `${activeName}'s attack hits! ${critical}  Roll: ${attackRoll} +${pB}pb ${modMessage} vs enemy AC:${ac}, ${dmgRoll} damage dealt!`;
    } else {

      if (attackRoll === 1) {
        critical = 'd1 roll, auto-miss';
      }
      nextMessage += `${activeName}'s attack misses!  ${critical} Roll: ${attackRoll} +${pB}pb ${modMessage} vs enemy AC:${ac}, ${dmgRoll} damage dealt!`;
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

  sendMagicAttack = (magicAttackObj) => {
    console.log('sendMagicAttack entered');
    console.log('this is the spellKey in the send magic attack: ', magicAttackObj.spellKey);

    let target = magicAttackObj.target;
    //for now we assume the target is always 0;
    let activeP = this.state.thisPlayerObj;
    let activeName = this.state.thisPlayerObj.name;
    let nextMessage = `${activeName} attacks ${this.state.enemyList[target].name}!!!     ` ;
        
    //comparing AC
    let attackRoll = this.roll('1d20').total;
    let pB = this.proficiencyBonus(activeP.level);

    let spellMod = 0;
    let modMessage = '';
    if (this.state.thisPlayerObj.spellModifier !== 'none') {
      spellMod = this.modifiers(this.state.thisPlayerObj.stats[this.state.thisPlayerObj.spellModifier]);
      modMessage = `+ ${spellMod} (${this.state.thisPlayerObj.spellModifier}) `;
    }
    
    let ac = this.state.enemyList[target].armor_class[1];
    var dmgRoll = 0;

    //TEMPORARY 
    attackRoll = 20;
    let critical = '';

    if (((attackRoll + pB + spellMod >= ac) || (attackRoll === 20)) && (attackRoll !== 1)) {
      if (attackRoll === 20) {
        let dice = activeP.weapon[1];
        dice = '2' + dice.substring(1);
        dmgRoll = this.roll(dice).total + spellMod;
        critical = 'Critical Hit! 2x dmg dice!'
      } else {
        dmgRoll = this.roll(activeP.weapon[1]).total + spellMod;
      }
      
      nextMessage += `${activeName}'s spell attack hits! ${critical}  Roll: ${attackRoll} +${pB}pb ${modMessage} vs enemy AC:${ac}, ${dmgRoll} damage dealt!`;
    } else {

      if (attackRoll === 1) {
        critical = 'd1 roll, auto-miss';
      }
      nextMessage += `${activeName}'s spell attack misses!  ${critical} Roll: ${attackRoll} +${pB}pb ${modMessage} vs enemy AC:${ac}, ${dmgRoll} damage dealt!`;
    }

    //after performing relevant computations, upload to server
    this.setState({acquiringTarget : false});
    socket.emit('spellAttack', {
      targetName: this.state.enemyList[target].name,
      attacker: this.props.thisPlayer,
      damage: dmgRoll,
      target: target,
      msg: nextMessage,
      action: 'spellAttack',
      spellKey: magicAttackObj.spellKey,
    });
  }

  getTarget = (e) => {
    if (this.state.acquiringTarget) {
      let index = this.getIndexOf(e.currentTarget.id, this.state.enemyList);
    
      if (this.state.acquiringTarget.action === 'spellAttack') {
        let magicAttackObj = {
          target: index,
          spellKey: this.state.acquiringTarget.spellKey,
        }

        this.sendMagicAttack(magicAttackObj);
      } else {
        this.sendAttack(index);
      }
    }
    // this.logNext(`${this.props.thisPlayer} targets ${e.currentTarget.id}`);
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
      //  socket.emit('chat', `${this.props.thisPlayer}: ${this.state.chatBox}`);
      socket.emit('chat', {
        speaker: this.props.thisPlayer,
        msg: this.state.chatBox,
      });
      this.setState({chatBox: ''});
    }
  }
  
  currentlyOnlineHandler = (e) => {
    this.setState({showOnline: !this.state.showOnline});
  }

  setAcquiringTarget = (objective) => {
    this.setState({acquiringTarget: objective});
  }

  openNewtab = (msg) => {
    let newChatWindowObj = {
    };
  }


  render () {
    let currentlyOnline = (this.state.showOnline)? Object.keys(this.state.currentlyOnline).map(element => <div>{element.slice(0,8)}</div>) : null;
    let currentlyOnlineToggle = (this.state.showOnline)? <span onClick={this.currentlyOnlineHandler}> - </span> : <span onClick={this.currentlyOnlineHandler}> + </span>;
    
    return (
      <div>
        <ContextMenu thisPlayer={this.props.thisPlayer} thisPlayerObj={this.props.thisPlayerObj} logNext={this.logNext} sendChat={this.sendChat}/>
      <div class="grid-container">
        
        <MagicMenu closeMagicModal={this.closeMagicModal} setAcquiringTarget={this.setAcquiringTarget} getTarget={this.getTarget} thisPlayer={this.props.thisPlayer} activeEntity={this.state.activeEntity} logNext={this.logNext}/>
        <InitiativeCheck closeModal={this.closeModal} adventurerList={this.state.culledList} updateUI={this.updateUI} initiativeList={this.state.initiativeList}/>
        <div class="item1" id="item1override">
          <p id="currentlyOnline" onClick={this.currentlyOnlineHandler}>Currently Online: {currentlyOnlineToggle}{currentlyOnline} </p>
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
          <button onClick={this.openModal}>Roll Initiative</button>
        </div>

        <div class="item3" id="chatWindow">
          <ChatWindow combatLog={this.state.combatLog} statusLog={this.state.statusLog} privateMessage={this.state.privateMessage}/>
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
            <CombatMenu attack={this.attack} openMagicModal={this.openMagicModal} closeMagicModal={this.closeMagicModal} acquiringTarget={this.state.acquiringTarget} />
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default ActiveGUI;  