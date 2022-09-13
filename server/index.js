const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
const server = require('http').createServer(app);
const { Server } = require('socket.io');
const db = require('./dmhelper_db/dmhelper_db_routes');

var adventurerList = require('../test/players');
var enemyList = require('../test/enemies');
var masterTurnList = {
  inCombat: false,
  currentTurn: 0,
  turn: '',
  turnList: [{name: 'Please Roll Initiative'}],
  adventurerList: adventurerList,
  enemyList: enemyList,
  currentlyOnline: {},
  socketList:{},
};

const io = new Server(server);

var getIndexOf = (name, array) => {
  for (var i = 0; i < array.length; i++) {
    if (array[i].name === name) {
      return i;
    }
  }
  return -1;
}

var generateIndex = (list) => {
  let indexObj = {}
  for (var i = 0; i < list.length; i++) {
    indexObj[list[i].name] = i;
  }
  return indexObj;
}

var proficiencyBonus = (level) => {
  return Math.floor((2 + (level - 1))/4);
}

var modifiers = (stat) => {
  return Math.floor((stat - 10)/2);
}

var roll = (dice) => {
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


var incrementTurn = () => {
  if (masterTurnList.currentTurn === (masterTurnList.turnList.length - 1)) {
    masterTurnList.currentTurn = 0;
  } else {
    masterTurnList.currentTurn++;
  }
}

var printList = (list) => {
  list.forEach(e => console.log(`name: ${e.name} init: ${e.initiative}`));
}


var initAndSort = (initiativeList) => {

  //populate the adventurer
  for (var i = 0; i < adventurerList.length; i++) {
    adventurerList[i].initiative = initiativeList[adventurerList[i].name];
    adventurerList[i].type = 'adventurer';
  }
  for (var i = 0; i < enemyList.length; i++) {
    enemyList[i].initiative = Math.floor(Math.random() * 20) + 1;
    enemyList[i].type = 'enemy';
  }

  //sort the arrays
  adventurerList.sort((a,b) => b.initiative - a.initiative);
  enemyList.sort((a,b) => b.initiative - a.initiative);
}



var enemyAttack = (activeEnemy) => {
    //enemy should select a target. 
    let enemyTarget = Math.floor(Math.random() * adventurerList.length);

    let targetPlayer = adventurerList[enemyTarget];
    let msgLog = [];
    
    msgLog.push(`${activeEnemy.name} attacks ${targetPlayer.name} `);

    //compute the data!
    let attackRoll = roll('1d20').total;
    let pB = proficiencyBonus(activeEnemy.level);
    let dexMod = modifiers(activeEnemy.stats.dex);
    let ac = targetPlayer.armor_class[1];
    let dmgRoll = 0; 
    //let hit = false;

    if ((attackRoll + pB + dexMod) >= ac) {
      dmgRoll = roll(activeEnemy.weapon[1]).total;
      msgLog.push(`Attack hits!   Roll: ${attackRoll} +${pB}pb +${dexMod}dex Mod vs player AC:${ac}.  ${dmgRoll} damage dealt to ${targetPlayer.name}`);
      //hit = true;
      adventurerList[enemyTarget].hp[0] -= dmgRoll;
    } else {
      msgLog.push(`${activeEnemy.name}'s attack misses!   Roll: ${attackRoll} +${pB}pb +${dexMod}dex Mod vs enemy AC:${ac}  ${dmgRoll} damage dealt`);
    }
    
    return msgLog;
  }


io.on('connection', (socket) => {
    console.log(`a user connected on ${PORT}`);

    let initiativeList = {};
    let checkList = {};

    adventurerList.forEach(element => checkList[element.name] = true);
    adventurerList.forEach(element => initiativeList[element.name] = false);

      
    socket.on('initRoll', (message) => {
      delete checkList[message.name];

      if (initiativeList[message.name] === false) {
        initiativeList[message.name] = message.roll;
      } else {
        socket.emit('already rolled!', message);
      }

      // upon init Roll Done...
      if (Object.keys(checkList).length === 0) {
        initAndSort(initiativeList);

        masterTurnList.inCombat = true;
        masterTurnList.turnList = adventurerList.concat(enemyList).sort((a,b) => b.initiative - a.initiative);
        masterTurnList.adventurerList = adventurerList;
        masterTurnList.enemyList = enemyList;

        printList(masterTurnList.turnList);
        //masterTurnList.turn = masterTurnList.turnList[masterTurnlist.currentTurn].name;
        while (masterTurnList.turnList[masterTurnList.currentTurn].type === 'enemy') {
          console.log('name ', masterTurnList.turnList[masterTurnList.currentTurn].name);
      
          if (masterTurnList.turnList[masterTurnList.currentTurn].hp[0] > 0) {
            message.msgLog = enemyAttack(masterTurnList.turnList[masterTurnList.currentTurn]);
            message.mTL = masterTurnList;
            message.activeEntity = masterTurnList.turnList[masterTurnList.currentTurn].name;
            io.emit('enemyAttack', message);
          }
          incrementTurn();
        }  

        //pass the global turn object to each of the logged in members
        masterTurnList.activeEntity = masterTurnList.turnList[masterTurnList.currentTurn].name;
        io.emit('initRollDone', masterTurnList);
        
      }

      io.emit('rollReceived', message);
      
      io.emit('rollInitative', message );
    });
        
    socket.on('chat', (message) => {
      io.emit('chat', message );
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

      let thisPlayerObj = getIndexOf(message.thisPlayer, masterTurnList.adventurerList);
 
      message.enemyList = masterTurnList.enemyList,
      message.adventurerList = masterTurnList.adventurerList,
      message.thisPlayerObj = masterTurnList.adventurerList[thisPlayerObj],
      message.activeEntity = masterTurnList.turnList[masterTurnList.currentTurn].name,
      message.currentlyOnline = masterTurnList.currentlyOnline;

      

      //culled adventurerList
      let culledList = [];
      masterTurnList.adventurerList.forEach((e) => {
        if (masterTurnList.currentlyOnline[e.name]) {
          culledList.push(e);
        } 
      });

      message.culledList = culledList;

      io.emit('getStatus', message );
    })

    socket.on('attack', (message) => { 

      if (message.attacker !== masterTurnList.turnList[masterTurnList.currentTurn].name) {
        message.msg = `${message.attacker} tries to attack, but it is not their turn!`;
        message.mTL = masterTurnList;
        message.activeEntity = masterTurnList.turnList[masterTurnList.currentTurn].name;
        message.dmg = message.dmg;

        io.emit('attack-reply', message);
      } else {
        let e_i = getIndexOf(message.targetName, enemyList);
      
        //update dmg.  may have to update spell slots later
        masterTurnList.enemyList[e_i].hp[0] -= message.dmg;
        message.mTL = masterTurnList;

        incrementTurn();
        message.activeEntity = masterTurnList.turnList[masterTurnList.currentTurn].name;

        if (masterTurnList.inCombat) {
          io.emit('attack-reply', message);
        }
        

        while (masterTurnList.turnList[masterTurnList.currentTurn].type === 'enemy') {
          console.log('name ', masterTurnList.turnList[masterTurnList.currentTurn].name);
      
          if (masterTurnList.turnList[masterTurnList.currentTurn].hp[0] > 0) {
            message.msgLog = enemyAttack(masterTurnList.turnList[masterTurnList.currentTurn]);
            message.mTL = masterTurnList;
            message.activeEntity = masterTurnList.turnList[masterTurnList.currentTurn].name;
            io.emit('enemyAttack', message);
          }
          incrementTurn();
        }  

      }
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


server.listen(PORT, () => {
    console.log(directory);
    console.log(`listening on http://localhost:${PORT}`);
});
