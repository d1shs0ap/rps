const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on('user', (username) => {

    // Bind username to the socket object (i.e. bind username to id)
    socket.username = username;
    
    //Join room named 'lobby'
    socket.join('lobby');

    // Get a list of all clients
    io.of('/').in('lobby').clients((error, clients) => {
      if (error) throw error;
      
      // Gets a list of all usernames based on client id and the username-id binding from before
      let users = clients.map((value) => {
        return io.of('/').in('lobby').connected[value].username;
      });
      
      // Sends everyone the updated list
      io.in('lobby').emit('updated users', users);
    });

    // console.log(name);
    // console.log(email);
    // console.log(username);
  })

  socket.on('challenge', (username) => {
    
  })

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(5000, () => console.log(`Listening on port 5000`));