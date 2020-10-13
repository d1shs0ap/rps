const express = require('express');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true})

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));


// socket.io handlers
io.on("connection", (socket) => {
  console.log("New client connected");

  // for when establishing a connection to lobby
  require('./api/lobby/connectToLobby')(io, socket)
  // for disconnection during lobby
  require('./api/lobby/disconnectLobby')(io, socket)
  
  // for sending challenges
  require('./api/challenge/sendChallenge')(io, socket)
  // for accepting challenges and starting game
  require('./api/challenge/acceptChallenge')(io, socket)

  // for establishing a shared starting time (as a Date() object) between players
  require('./api/game/joinedRoom')(io, socket)
  // for receiving hand from client and sending it to the other player
  require('./api/game/transferHand')(io, socket)
  // for game over page (incl. declaring and calculating the winner)
  require('./api/game/gameOver')(io, socket)
});

server.listen(5000, () => console.log(`Listening on port 5000`));