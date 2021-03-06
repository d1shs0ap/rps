require('dotenv').config();

const express = require('express');
const app = express();

const fs = require('fs');

const privateKey = fs.readFileSync('/etc/letsencrypt/live/realtimerps.com/privkey.pem');
const certificate = fs.readFileSync('/etc/letsencrypt/live/realtimerps.com/fullchain.pem');
const credentials = {key: privateKey, cert: certificate};

const server = require('https').createServer(credentials, app);
const io = require('socket.io')(server);

const mongoose = require('mongoose');
mongoose.connect(process.env.ATLAS_CONNECTION_URL, {useNewUrlParser: true})
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


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
  // for saving common end time in DB
  require('./api/game/startTime')(io, socket)
  // for receiving hand from client and sending it to the other player
  require('./api/game/transferHand')(io, socket)
  // for game over page (incl. declaring and calculating the winner)
  require('./api/game/gameOver')(io, socket)
});

server.listen(process.env.SOCKET_PORT, () => console.log(`Listening on port ${process.env.SOCKET_PORT}`));
