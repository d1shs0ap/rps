module.exports = (io, socket) => {
  socket.on('game over', (uuid) => {
    //Leave game room
    socket.leave(uuid);
  });
}