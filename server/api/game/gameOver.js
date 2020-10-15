const Game = require('../../models/game');

function calculateWinner(timeStamps, endTime, playerOneName) {
  let playerOneHand = 'rock';
  let winningTime = 0;
  let losingTime = 0;
  let playerTwoHand = 'rock';

  for (let i = 0; i < timeStamps.length; ++i) {
    let curStamp = timeStamps[i];
    let timeDiff = 0;
    if (i < timeStamps.length - 1){
      timeDiff = timeStamps[i+1].time - curStamp.time;
    } else {
      timeDiff = endTime - curStamp.time
    }
    
    // keep track of whichever hand was changed
    if (curStamp.player == playerOneName){
      playerOneHand = curStamp.hand;
    } else {
      playerTwoHand = curStamp.hand;
    }

    // check who won in this interval
    if(playerOneHand==='rock') {
      if(playerTwoHand==='paper'){
        losingTime += timeDiff;
      }
      else if(playerTwoHand==='scissors'){
        winningTime += timeDiff;
      }
    }
    else if(playerOneHand==='paper') {
      if(playerTwoHand==='rock'){
        winningTime += timeDiff;
      }
      else if(playerTwoHand==='scissors'){
        losingTime += timeDiff;
      }
    }
    else if(playerOneHand==='scissors') {
      if(playerTwoHand==='rock'){
        losingTime += timeDiff;
      }
      else if(playerTwoHand==='paper'){
        winningTime += timeDiff;
      }
    }
  }

  if (winningTime > losingTime) {
    return true;
  } else return false;

}

module.exports = (io, socket) => {
  socket.on('game over', (uuid) => {
    // Calculate the winner
    const curGame = Game.findOne({ uuid: uuid });
    console.log(curGame);
    const playerOneWon = calculateWinner(curGame.timestamps, curGame.endTime, curGame.players[0]);

    let winner = '';
    if(playerOneWon){
      winner = curGame.players[0];
    } else{
      winner = curGame.players[1];
    }

    io.to(uuid).emit('winner', winner);

    // Leave game room
    socket.leave(uuid);
  });
}
