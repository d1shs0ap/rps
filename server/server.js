const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const { v4: uuidv4 } = require('uuid');


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

  })


  // Sends challenge to user
  socket.on('challenge', (username, curUsername) => {
    io.of('/').in('lobby').clients((error, clients) => {
      if (error) throw error;
  
      for(let client of clients) {
        if (io.of('/').in('lobby').connected[client].username === username){
          // send it to that socket
          socket.to(client).emit('accept challenge', curUsername);
          break;
        }
      }    
    });
  })


  // After user accepted, start game
  socket.on('accepted', (username, curUsername) => {
    io.of('/').in('lobby').clients((error, clients) => {
      if (error) throw error;
  
      for(let client of clients) {
        let clientSocket = io.of('/').in('lobby').connected[client];
        if (clientSocket.username === username){
          // uuidv4
          const uuid = uuidv4();

          socket.leave('lobby');
          socket.join(uuid);

          clientSocket.leave('lobby');
          clientSocket.join(uuid);

          io.in(uuid).emit('start game', uuid, username, curUsername);
          break;
        }
      }    
    });
  })



  socket.on("disconnect", () => {
    console.log('Client disconnected')
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
  });
});

server.listen(5000, () => console.log(`Listening on port 5000`));