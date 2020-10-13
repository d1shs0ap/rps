module.exports = (io, socket) => {
  //when both players have connected to rooms
  let readied = 0;

  socket.on('ready', (uuid) => {
    io.of('/').in(uuid).clients((error, clients) => {
      if (error) throw error;
      if (clients.length >= 2 && readied == 0){
        const startTime = new Date();
        io.to(uuid).emit('readied', startTime.getTime());
        readied += 1
        setTimeout(()=> {
          readied = 0
        }, 1000);
      }
    });
  });
}