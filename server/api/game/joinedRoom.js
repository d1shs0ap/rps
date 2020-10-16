module.exports = (io, socket) => {
  
  //when both players have connected to rooms
  socket.on('ready', (uuid) => {
    io.of('/').in(uuid).clients((error) => {

      if (error) throw error;

      const startTime = new Date();
      io.to(uuid).emit('readied', startTime.getTime());

    });
  });
}
