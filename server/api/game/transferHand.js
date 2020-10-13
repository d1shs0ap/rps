module.exports = (io, socket) => {

  let timestamps = [];
  //update rps hand
  socket.on('give hand', (player, hand, uuid) => {
    const updateTime = new Date();
    //add timestamps to mongodb
    timestamps.push([player, hand, updateTime])
    socket.to(uuid).emit('receive hand', hand);
  })
}