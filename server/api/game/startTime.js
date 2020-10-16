const Game = require('../../models/game');

module.exports = (io, socket) => {
  socket.on('confirmed start time', (uuid, startTime, player) => {
    const endDate = new Date(startTime + 8000);
    
    Game.findOne({ uuid: uuid }, (err, game) => {
      if (err) console.log(err);

      game.endTime = endDate;
      // add player into list of players
      game.players.push(player);
      game.save((err) => {
        if(err) console.log(err);
      });
    });
  })
}