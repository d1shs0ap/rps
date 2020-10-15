module.exports = (io, socket) => {
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
}
