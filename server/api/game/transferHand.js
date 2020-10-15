const Game = require('../../models/game');

module.exports = (io, socket) => {
  //update rps hand
  socket.on('give hand', (player, hand, uuid) => {
    const updateTime = new Date();

    console.log(player)

    //add timestamps to mongodb
    const timeStamp = { player: player, hand: hand, time: updateTime };
    console.log(timeStamp);
    Game.findOneAndUpdate({ uuid: uuid }, { $push: { timestamps: timeStamp } }, (error, success) => {
      if (error) {
        console.log(error);
      } else {
        console.log(success);
      }
    });

    //tell the other player about the hand change
    socket.to(uuid).emit('receive hand', hand);
  })
}
