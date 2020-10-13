const { v4: uuidv4 } = require('uuid');

module.exports = (io, socket) => {
  // After user accepted, start game
  socket.on('accepted', (username, curUsername) => {
    io.of('/').in('lobby').clients((error, clients) => {
      if (error) throw error;
  
      for(let client of clients) {
        let clientSocket = io.of('/').in('lobby').connected[client];
        if (clientSocket.username === username){
          // uuidv4
          const uuid = uuidv4();

          //leave lobby and join game for both users
          socket.leave('lobby', () => {
            socket.join(uuid, () => {
              clientSocket.leave('lobby', () => {
                clientSocket.join(uuid, () => {

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

                  // signal for game to start
                  io.to(uuid).emit('start game', uuid, username, curUsername);
                });
              });
            });
          });
        };
      }    
    });
  });
}