const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);


io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on('user', (name, email, username) => {
    socket.send(username);
    console.log(name);
    console.log(email);
    console.log(username);
  })

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});


const getApiAndEmit = socket => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};

server.listen(5000, () => console.log(`Listening on port 5000`));