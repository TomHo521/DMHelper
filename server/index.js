const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
require("dotenv").config();
const server = require('http').createServer(app);
const { Server } = require('socket.io');
const db = require('./dmhelper_db/dmhelper_db_routes');
const dm = require('./DMMath');

var adventurerList = require('../test/players');
var enemyList = require('../test/enemies');
var spellList = require('../test/spellList_server');

var masterTurnList = {
  inCombat: false,
  currentTurn: 0,
  turn: '',
  turnList: [{name: 'Please Roll Initiative'}],
  adventurerList: adventurerList,  //the total partylist, logged in or not.  We should 
                        //not be directly using this for anything after initialization
  enemyList: enemyList,      // the list of active enemies.  
  onlineAdventurerList: [],  // active Player states.
  deadAdventurerList: {},    // currently wounded adventurers
  deadEnemyList:{},          // currently dead enemies.
  currentlyOnline: {},       // currently logged in users
  socketList:{},
};

var chatRoomStore = {

};

var initiativeList = {};

const io = new Server(server);

var getIndexOf = (name, array) => {
  for (var i = 0; i < array.length; i++) {
    if (array[i].name === name) {
      return i;
    }
  }
  return -1;
}


var incrementTurn = () => {

    // if the number of allies dead is equal to number online, lose.
    let allEnemiesDead = masterTurnList.enemyList.every(e => e.hp[0] <= 0);
    let allAdventurersDead = masterTurnList.onlineAdventurerList.every(e => e.hp[0] <= 0);

    if (allAdventurersDead || allEnemiesDead) {
      endCombat(!allAdventurersDead);
    }

  if (masterTurnList.currentTurn === (masterTurnList.turnList.length - 1)) {
    masterTurnList.currentTurn = 0;
  } else {
    masterTurnList.currentTurn++;
  }
}

var printList = (list) => {
  list.forEach((e, i) => console.log(`turn: ${i} name: ${e.name} init: ${e.initiative}`));
}


var initAndSort = (initiativeList) => {

  //populate the adventurer
  for (var i = 0; i < adventurerList.length; i++) {
    if (initiativeList[adventurerList[i].name]) {
      adventurerList[i].initiative = initiativeList[adventurerList[i].name];
      masterTurnList.onlineAdventurerList.push(adventurerList[i]);
    } else {
      adventurerList[i].initiative = 0;
    } 

    adventurerList[i].type = 'adventurer';
  }

  for (var i = 0; i < enemyList.length; i++) {
    enemyList[i].initiative = Math.floor(Math.random() * 20) + 1;
    enemyList[i].type = 'enemy';
  }

  //sort the arrays
  adventurerList.sort((a,b) => b.initiative - a.initiative);
  masterTurnList.onlineAdventurerList.sort((a,b) => b.initiative - a.initiative);
  enemyList.sort((a,b) => b.initiative - a.initiative);
}

var hasEveryoneRolled = (initiativeList) => {

  var checklist = true;
  //initiativeList is an object initialized with all party members to false
  //the false flag prevents additional re-rolls
  //here we use it against the list of those currentlyOnline.
  //when all party members currently online have rolled, return true;
  console.log('online list: ', masterTurnList.currentlyOnline);
  for (var player in masterTurnList.currentlyOnline) {
    checklist = checklist && initiativeList[player];
  }

  return checklist;
}




var enemyAttack = (activeEnemy) => {
    //enemy should select a target. 
    let enemyTarget = Math.floor(Math.random() * masterTurnList.onlineAdventurerList.length);

    let targetPlayer = masterTurnList.onlineAdventurerList[enemyTarget];
    let msgLog = [];
    
    msgLog.push(`${activeEnemy.name} attacks ${targetPlayer.name} `);

    //compute the data!
    let attackRoll = dm.roll('1d20').total;
    let pB = dm.proficiencyBonus(activeEnemy.level);
    let dexMod = dm.modifiers(activeEnemy.stats.dex);
    let ac = targetPlayer.armor_class[1];
    let dmgRoll = 0; 
    //let hit = false;

    if ((attackRoll + pB + dexMod) >= ac) {
      dmgRoll = dm.roll(activeEnemy.weapon[1]).total;
      msgLog.push(`Attack hits!   Roll: ${attackRoll} +${pB}pb +${dexMod}dex Mod vs player AC:${ac}.  ${dmgRoll} damage dealt to ${targetPlayer.name}`);
      //hit = true;
      if (masterTurnList.onlineAdventurerList[enemyTarget].hp[0] - dmgRoll > 0) {
        masterTurnList.onlineAdventurerList[enemyTarget].hp[0] -= dmgRoll;
      } else {
        masterTurnList.onlineAdventurerList[enemyTarget].hp[0] = 0;
        //if hp falls to zero, add them to the deadAdventurerList
        masterTurnList.deadAdventurerList[targetPlayer] = {status: 'dead', attacker: activeEnemy.name};
      }

    } else {
      msgLog.push(`${activeEnemy.name}'s attack misses!   Roll: ${attackRoll} +${pB}pb +${dexMod}dex Mod vs enemy AC:${ac}  ${dmgRoll} damage dealt`);
    }
    
    return msgLog;
  }

var enemyTurnLoop = (message) => {
  while (masterTurnList.turnList[masterTurnList.currentTurn].type === 'enemy') {
    if (masterTurnList.turnList[masterTurnList.currentTurn].hp[0] > 0) {
      message.msgLog = enemyAttack(masterTurnList.turnList[masterTurnList.currentTurn]);
      message.mTL = masterTurnList;
      message.activeEntity = masterTurnList.turnList[masterTurnList.currentTurn].name;
      io.emit('enemyAttack', message);
    }
    incrementTurn();
  }  
}

//the master combat loop which handles enemy attacks, broadcasts,
//dead status, filtering, which loops until the next input is pending.
//therefore it takes a message parameter
var masterCombatLoop = (message) => {
  enemyTurnLoop(message);
}

//function to set the state to end combat.  
//change the game state , broadcast changes.

var endCombat = (adventurersVictorious) => {
  
  masterTurnList.inCombat = false;
  masterTurnList.activeEntity = 'out of combat';

  //check if we  need the bottom two..  
  masterTurnList.currentTurn = 0;
  masterTurnList.turn = '';
  masterTurnList.turnList = [{name: 'Please Roll Initiative'}];

  //restore the initiativeList back to false
  Object.keys(initiativeList).forEach(e => initiativeList[e] = false);

  if (adventurersVictorious) {
    // for now we add a static 1 gold and 50 xp bump;
    masterTurnList.onlineAdventurerList.forEach(e => {
      e.xp += 50;
      e.gold +=1;
    });
  } else {
    masterTurnList.turnList = [{name: 'GAME OVER'}];
  }

  broadcastState();
}

//pushes the game state to all users;
var broadcastState = () => {
  
  let message = {};

  message.enemyList = masterTurnList.enemyList,
  message.adventurerList = masterTurnList.adventurerList,
  message.activeEntity = (masterTurnList.inCombat)? masterTurnList.turnList[masterTurnList.currentTurn].name : 'out of combat';
  message.currentlyOnline = masterTurnList.currentlyOnline;
  
  //culled adventurerList
  let culledList = [];
  masterTurnList.adventurerList.forEach((e) => {
    if (masterTurnList.currentlyOnline[e.name]) {
      culledList.push(e);
    } 
  });

  message.culledList = culledList;
  message.initiativeList = initiativeList;
  message.inCombat = masterTurnList.inCombat;

  io.emit('pushState', message);
}


io.on('connection', (socket) => {
    console.log(`a user connected on ${PORT}`);

    if (Object.keys(initiativeList).length === 0) {
      adventurerList.forEach(element => initiativeList[element.name] = false);
    }
      
    socket.on('initRoll', (message) => {
      console.log('initRoll called! ', initiativeList[message.name]);

      if (initiativeList[message.name] === false) {
        initiativeList[message.name] = message.roll;
      } else {
        socket.emit('already rolled!', message);
      }

      // upon init Roll Done...
      if (hasEveryoneRolled(initiativeList)) {
        initAndSort(initiativeList);

        // masterTurnList.inCombat = true;
        // masterTurnList.turnList = adventurerList.concat(enemyList).sort((a,b) => b.initiative - a.initiative);
        // masterTurnList.adventurerList = adventurerList;
        // masterTurnList.enemyList = enemyList;

        masterTurnList.inCombat = true;
        masterTurnList.turnList = masterTurnList.onlineAdventurerList.concat(enemyList).sort((a,b) => b.initiative - a.initiative);
        masterTurnList.adventurerList = adventurerList;
        masterTurnList.enemyList = enemyList;

        printList(masterTurnList.turnList);
        //masterTurnList.turn = masterTurnList.turnList[masterTurnlist.currentTurn].name;
        masterCombatLoop(message);

        //pass the global turn object to each of the logged in members
        masterTurnList.activeEntity = masterTurnList.turnList[masterTurnList.currentTurn].name;

        io.emit('initRollDone', masterTurnList);
        
      }

      message.initiativeList = initiativeList;

      io.emit('rollReceived', message);
      
      //io.emit('rollInitative', message );
    });
        
    socket.on('chat', (message) => {

      if (message.type === 'pm') {
        message.sender = masterTurnList.socketList[socket.id];

        if (!(message.roomID in chatRoomStore)) {
          chatRoomStore[message.roomID] = message.recipients;
        }

        Object.keys(chatRoomStore[message.roomID]).forEach(ele => {
          if (ele in masterTurnList.currentlyOnline) {
            io.to(masterTurnList.currentlyOnline[ele]).emit('pm', message);
          }
        })

        // for (ele in message.recipients) {
        //   if (ele in masterTurnList.currentlyOnline) {
        //     io.to(masterTurnList.currentlyOnline[ele]).emit('pm', message);
        //   } 
        // }
        //we also message back the sender
        // no need to send back to sender, sender is now part of recipient list.
        // io.to(socket.id).emit('pm', message);        
      } else {
        io.emit('chat', message);
      }

      

        // if (message.msg.substring(0,3) === '/w ') {
        //   let pmDestinations = message.msg.split(" ");
        //   let counter = 1;
        //   //determine where the recipient list ends and where the message begins.
        //   while ((pmDestinations[counter] in masterTurnList.currentlyOnline) && (counter < pmDestinations.length)) {
        //     counter++;
        //   }
        //   let pmMessage = {
        //       sender: masterTurnList.socketList[socket.id],
        //       roomID: 'tb3',
        //       chatObj: message.speaker + '(pm): ' + pmDestinations.slice(counter).join(' '),
        //     };
        //   for (var k = 1; k < counter; k++) {
        //     if (pmDestinations[k] in masterTurnList.currentlyOnline) {
        //       io.to(masterTurnList.currentlyOnline[pmDestinations[k]]).emit('pm', pmMessage);
        //     }
        //   }
        //   io.to(socket.id).emit('pm', pmMessage);        
        // } else {
          // io.emit('chat',message);
        //}     
    });

    socket.on('disconnect', (msg) => {

      delete masterTurnList.currentlyOnline[masterTurnList.socketList[socket.id]];
      let newText = `${masterTurnList.socketList[socket.id]} has disconnected`;
      console.log('who has disconnected: ', masterTurnList.socketList[socket.id]);

      let craftedMSG = {
        msg: newText,
        currentlyOnline: masterTurnList.currentlyOnline,
      };

      delete masterTurnList.socketList[socket.id];

      //culled adventurerList
      let culledList = [];
      masterTurnList.adventurerList.forEach((e) => {
        if (masterTurnList.currentlyOnline[e.name]) {
          culledList.push(e);
        } 
      });

      craftedMSG.culledList = culledList;

      io.emit('playerdc', craftedMSG);

    });

    socket.on('getStatus', (message) => {

      masterTurnList.socketList[socket.id] = message.thisPlayer;

      masterTurnList.currentlyOnline[message.thisPlayer] = socket.id;
      Object.keys(masterTurnList.currentlyOnline).forEach(e => console.log(`${e}: ${masterTurnList.currentlyOnline[e]}`));

      let thisPlayer = getIndexOf(message.thisPlayer, masterTurnList.adventurerList);
 
      message.enemyList = masterTurnList.enemyList,
      message.adventurerList = masterTurnList.adventurerList,
      message.thisPlayerObj = masterTurnList.adventurerList[thisPlayer],
      message.activeEntity = (masterTurnList.inCombat)? masterTurnList.turnList[masterTurnList.currentTurn].name : 'out of combat';
      message.currentlyOnline = masterTurnList.currentlyOnline;
      message.inCombat = masterTurnList.inCombat;

      //culled adventurerList
      let culledList = [];
      masterTurnList.adventurerList.forEach((e) => {
        if (masterTurnList.currentlyOnline[e.name]) {
          culledList.push(e);
        } 
      });

      message.culledList = culledList;


      message.initiativeList = initiativeList;

      io.emit('getStatus-reply', message );
    })

    socket.on('attack', (message) => { 

      if (message.attacker !== masterTurnList.turnList[masterTurnList.currentTurn].name) {
        message.msg = `${message.attacker} tries to attack, but it is not their turn!`;
        // message.mTL = masterTurnList;
        // message.activeEntity = masterTurnList.turnList[masterTurnList.currentTurn].name;
        // message.dmg = message.dmg;
        io.emit('attack-reply', message);
      } else {
        let e_i = getIndexOf(message.targetName, enemyList);
      
        //update dmg.  may have to update spell slots later
        masterTurnList.enemyList[e_i].hp[0] -= message.dmg;

        message.mTL = masterTurnList;
        incrementTurn();
        message.activeEntity = masterTurnList.turnList[masterTurnList.currentTurn].name;
        message.enemyList =  masterTurnList.enemyList;

        if (masterTurnList.inCombat) {
          io.emit('attack-reply', message);
        }
        
        enemyTurnLoop(message);
      }
    });

    socket.on('spellAttack', (message) => {

      console.log('spellKey received from client: ', message.spellKey);
      console.log('type of spell received ', spellList[message.spellKey].attackType);
      console.log('target of said spell: ', message.target);
      console.log('damage to inflict: ', message.damage);
      console.log('received message: ', message.msg);

      if (message.attacker !== masterTurnList.turnList[masterTurnList.currentTurn].name) {
        message.msg = `${message.attacker} tries to attack, but it is not their turn!`;
        message.mTL = masterTurnList;
        message.activeEntity = masterTurnList.turnList[masterTurnList.currentTurn].name;
        message.dmg = message.damage;

        io.emit('attack-reply', message);
      } else {
   
        let e_i = getIndexOf(message.targetName, enemyList);
      
        //update dmg.  may have to update spell slots later
        masterTurnList.enemyList[e_i].hp[0] -= message.damage;
        message.mTL = masterTurnList;
        message.enemyList = masterTurnList.enemyList;
        
        incrementTurn();
        message.activeEntity = masterTurnList.turnList[masterTurnList.currentTurn].name;

        if (masterTurnList.inCombat) {
          io.emit('attack-reply', message);
        }
        
        enemyTurnLoop(message);

      }
    });

    socket.on('pm', () => {

      //need a routing mechanism to route pms to their proper roomID.
      //probably also need a mechanism to store who is in charge of which RoomID


    });

});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var directory = path.join(__dirname, '/../client/dist');
console.log(directory);
app.use(express.static(path.join(__dirname, '/../client/dist')));

app.get('/local', function (req, res) {
  res.send('Hello World');
});

app.use('/dmhelper', db);

server.listen(PORT, () => {
    console.log(directory);
    console.log(`listening on http://localhost:${PORT}`);
});
