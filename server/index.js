const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
const server = require('http').createServer(app);
const { Server } = require('socket.io');
var adventurerList = require('../test/players');
var enemyList = require('../test/enemies');
var masterTurnList = {
  inCombat: false,
  currentTurn: 0,
  turnList: [],
};

const io = new Server(server);

var getIndexOf = (name, array) => {
  for (var i = 0; i < array.length; i++) {
    if (array.name === name) {
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
  }
  for (var i = 0; i < enemyList.length; i++) {
    enemyList[i].initiative = Math.floor(Math.random() * 20) + 1;
  }

  //sort the arrays
  adventurerList.sort((a,b) => b.initiative - a.initiative);
  enemyList.sort((a,b) => b.initiative - a.initiative);
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

        masterTurnList.turnList = adventurerList.concat(enemyList).sort((a,b) => b.initiative - a.initiative);

        masterTurnList.adventurerList = adventurerList;
        masterTurnList.enemyList = enemyList;

        printList(masterTurnList.turnList);

        //pass the global turn object to each of the logged in members
        io.emit('initRollDone', masterTurnList);
      }

      io.emit('rollReceived', message);
      
      io.emit('rollInitative', message );
    });
        
    socket.on('chat', (message) => {
      io.emit('chat', message );
    });

    socket.on('attack', (message) => { 

      let e_i = getIndexOf(message.targetName, enemyList);
      let t_i = getIndexOf(message.targetName, masterTurnList.turnList);

      //update dmg.  may have to update spell slots later
      masterTurnList.enemyList[e_i] -= message.dmg;
      masterTurnList.turnList[t_i] -= message.dmg;

      message.mTL = masterTurnList;
      if (masterTurnList.inCombat) {
        io.emit('attack-reply', message);
      }

      incrementTurn();
      while (masterTurnList.turnList[masterTurnList.currentTurn].type === 'enemy') {
        io.emit('enemyAttack', `the enemy Attacks!`);
        incrementTurn();
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

// http.listen(PORT, () => {
//   console.log(directory);
//   console.log(`listening on http://localhost:${PORT}`);
// });

server.listen(PORT, () => {
    console.log(directory);
    console.log(`listening on http://localhost:${PORT}`);
});

// app.listen(PORT, () => {
//   console.log(`listening on http://localhost:${PORT}`);
// })