const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
const server = require('http').createServer(app);
const { Server } = require('socket.io');
var adventurerList = require('../test/players');
var enemyList = require('../test/enemies');


const io = new Server(server);

io.on('connection', (socket) => {
    console.log(`a user connected on ${PORT}`);
    //setInterval(() => { io.emit('attack', 'the server has a new msg')}, 3000);

    let initiativeList = {};
    let checkList = {};

    adventurerList.forEach(element => checkList[element.name] = true);
    adventurerList.forEach(element => initiativeList[element.name] = false);

    socket.on('initRoll', (message) => {

      //console.log(Object.keys(initiativeList));

      delete checkList[message.name];

      console.log('deleting ', message.name);
      console.log(`status of checklist is: ${Object.keys(checkList)}`);

      if (initiativeList[message.name] === false) {
        initiativeList[message.name] = message.roll;
      } else {
        socket.emit('already rolled!', message);
      }

      if (Object.keys(checkList).length === 0) {
        io.emit('initRollDone', initiativeList);
        Object.keys(initiativeList).forEach(element => {
          console.log(`${element} rolled a ${initiativeList[element]}`);
        });
      }

      io.emit('rollReceived', message);
      
      io.emit('rollInitative', message );
    });
    
    socket.on('rollInitiative', (message) => {

      initiativeList.push([message.login, message.roll]);

      if (initiativeList.length === adventurerList.length) {
        io.emit('initRollDone', {});
      }

      io.emit('rollInitative', message );
    });
    
    socket.on('chat', (message) => {
      io.emit('chat', message );
    });

    socket.on('message', (message) => {
      io.emit('message', `${socket.id.substring(0,2)} from the serverside ${message}` );
    });

    socket.on('attack', (message) => { 

      //take the attack data and parse it
      // enemyList[target].hp[0] -= dmg;
      
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