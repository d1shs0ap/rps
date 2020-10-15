module.exports = (io, socket) => {
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
}
