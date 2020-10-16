const Game = require('../../models/game');

module.exports = (io, socket) => {
  //update rps hand
  socket.on('give hand', (player, hand, uuid) => {
    const updateTime = new Date();

    //add timestamps to mongodb
    const timeStamp = { player: player, hand: hand, time: updateTime };
    Game.findOne({ uuid: uuid }, (err, game) => {
      if (err) console.log(err);
      // add time to timestamps list
      game.timestamps.push(timeStamp);
      game.save((err) => {
        if(err) console.log(err);
      });
    });

    //tell the other player about the hand change
    socket.to(uuid).emit('receive hand', hand);
  })
}
