const Game = require('../../models/game');

module.exports = (io, socket) => {
  socket.on('confirmed start time', (uuid, startTime) => {
    const endDate = new Date(startTime + 8000);
    
    const curGame = Game.findOne({ uuid: uuid });
    curGame.endTime = endDate;

    // add player into list of players
    curGame.players.push(playerOne)

    curGame.save();
  })
}