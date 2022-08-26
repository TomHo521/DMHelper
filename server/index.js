const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
const server = require('http').createServer(app);
const { Server } = require('socket.io');
var adventurerList = require('../test/players');
var enemyList = require('../test/enemies');

const io = new Server(server);


var generateIndex = (list) => {
  let indexObj = {}
  for (var i = 0; i < list.length; i++) {
    indexObj[list[i].name] = i;
  }
  return indexObj;
}


var rollEnemyInitiative = () => {
  let enemyInitRolls = [];
  let enemyInitObj = {};

  for (var i = 0; i < enemyList.length; i++) {
    let initObj = {
      name: enemyList[i].name,
      index: i,
      roll: Math.floor(Math.random() * 20) + 1,
    }
    enemyInitRolls.push(initObj);
    enemyInitObj[enemyList[i].name] = initObj.roll;
  }
  return {
    array: enemyInitRolls,
    obj: enemyInitObj,
  }; //returns array
}



var printTurnListObj = (turnListObj) => {
  console.log(`current turn is ${turnListObj.currentTurn}`);
  turnListObj.turnList.forEach(element => console.log(`${element.name}: ${element.roll}`));
  // console.log('adventurer turn order: ');
  // turnListObj.adventurerTurnList.forEach(element => console.log(`${element.name}: ${element.roll}`));
  // console.log('enemy turn order: ')
  // turnListObj.enemyTurnList.forEach(element => console.log(`${element.name}: ${element.roll}`));
  console.log(`total entities in combat: ${turnListObj.turnList.length}`);
}


io.on('connection', (socket) => {
    console.log(`a user connected on ${PORT}`);

    let initiativeList = {};
    let checkList = {};

    adventurerList.forEach(element => checkList[element.name] = true);
    adventurerList.forEach(element => initiativeList[element.name] = false);

    var adventurerIndex = generateIndex(adventurerList);
    var enemyIndex = generateIndex(enemyList);
       
    socket.on('initRoll', (message) => {
      delete checkList[message.name];

      if (initiativeList[message.name] === false) {
        initiativeList[message.name] = message.roll;
      } else {
        socket.emit('already rolled!', message);
      }

      // upon init Roll Done...
      if (Object.keys(checkList).length === 0) {

        let adventurerTurnArray = Object.keys(initiativeList).map(element => {return {
          name: element,
          index: adventurerIndex[element],
          roll: initiativeList[element],
        }});

        
        let enemyTurn = rollEnemyInitiative();
        

        // sort the intermediate arrays.  May remove if the server burden gets large
        adventurerTurnArray.sort((a,b) => b.roll - a.roll);
        enemyTurn.array = enemyTurn.array.sort((a,b) => b.roll - a.roll);

        let turnListObj = { 
          currentTurn: 0,
          turnList: adventurerTurnArray.concat(enemyTurn.array).sort((a,b) => b.roll - a.roll),
          //adventurerTurnList: adventurerTurnArray,
          adventurerTurnObj: initiativeList,
          //enemyTurnList: enemyTurn.array,
          enemyTurnObj: enemyTurn.obj,
        }
        printTurnListObj(turnListObj);

        io.emit('initRollDone', turnListObj);
      }

      io.emit('rollReceived', message);
      
      io.emit('rollInitative', message );
    });
        
    socket.on('chat', (message) => {
      io.emit('chat', message );
    });

    socket.on('message', (message) => {
      io.emit('message', `${socket.id.substring(0,2)} from the serverside ${message}` );
    });

    socket.on('attack', (message) => { 
      
      io.emit('attack', message);
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